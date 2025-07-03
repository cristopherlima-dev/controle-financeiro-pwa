// Service Worker - Controle Financeiro PWA
// Versão: 1.0.0

const CACHE_NAME = 'controle-financeiro-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Arquivos para cache inicial (offline-first)
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/icon-192x192.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// URLs que sempre precisam de rede
const NETWORK_FIRST = [
  '/api/',
  'https://cdn.tailwindcss.com'
];

// === INSTALL EVENT ===
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Static files cached successfully');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Failed to cache static files:', error);
      })
  );
});

// === ACTIVATE EVENT ===
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Remove old caches
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// === FETCH EVENT ===
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (except CDNs)
  if (url.origin !== location.origin && !isCDNRequest(url)) {
    return;
  }
  
  // Strategy selection
  if (isNetworkFirst(request.url)) {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(cacheFirstStrategy(request));
  }
});

// === STRATEGY: CACHE FIRST ===
async function cacheFirstStrategy(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    // If not in cache, fetch from network
    console.log('[SW] Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    
    // Fallback for HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
      const fallback = await caches.match('/index.html');
      return fallback || new Response('Offline - App não disponível', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    // Generic fallback
    return new Response('Recurso indisponível offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// === STRATEGY: NETWORK FIRST ===
async function networkFirstStrategy(request) {
  try {
    // Try network first
    console.log('[SW] Network first for:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Ultimate fallback
    return new Response('Recurso indisponível', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// === UTILITY FUNCTIONS ===
function isNetworkFirst(url) {
  return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

function isCDNRequest(url) {
  const cdnDomains = [
    'cdn.tailwindcss.com',
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  return cdnDomains.some(domain => url.hostname.includes(domain));
}

// === BACKGROUND SYNC (Future) ===
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-expenses') {
    event.waitUntil(syncExpenses());
  }
});

async function syncExpenses() {
  try {
    console.log('[SW] Syncing expenses in background...');
    // TODO: Implement background sync for expenses
    // This will be useful when we add cloud sync
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// === PUSH NOTIFICATIONS ===
self.addEventListener('push', event => {
  console.log('[SW] Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do seu Controle Financeiro',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'notification-' + Date.now()
    },
    actions: [
      {
        action: 'view',
        title: 'Ver Detalhes',
        icon: '/assets/icons/icon-96x96.png'
      },
      {
        action: 'dismiss',
        title: 'Dispensar',
        icon: '/assets/icons/icon-96x96.png'
      }
    ],
    requireInteraction: true,
    tag: 'expense-notification'
  };
  
  event.waitUntil(
    self.registration.showNotification('Controle Financeiro', options)
  );
});

// === NOTIFICATION CLICK ===
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    // Open app when notification clicked
    event.waitUntil(
      clients.openWindow('/')
    );
  }
  
  // Handle other actions...
});

// === MESSAGE FROM APP ===
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_UPDATE') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(STATIC_FILES);
    console.log('[SW] Cache updated successfully');
  } catch (error) {
    console.error('[SW] Cache update failed:', error);
  }
}

// === ERROR HANDLING ===
self.addEventListener('error', event => {
  console.error('[SW] Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

// === PERIODIC BACKGROUND SYNC (Future) ===
self.addEventListener('periodicsync', event => {
  if (event.tag === 'expense-reminder') {
    event.waitUntil(checkExpenseReminders());
  }
});

async function checkExpenseReminders() {
  try {
    console.log('[SW] Checking expense reminders...');
    // TODO: Check for upcoming due dates and send notifications
    // This feature will be implemented when we have more complex logic
  } catch (error) {
    console.error('[SW] Reminder check failed:', error);
  }
}

console.log('[SW] Service Worker script loaded successfully');