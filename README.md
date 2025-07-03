# 💰 Controle Financeiro PWA

Um Progressive Web App moderno e responsivo para controle financeiro pessoal, com notificações push, relatórios avançados e funcionalidade offline.

## 🚀 Funcionalidades

### ✅ **Funcionando (v0.2.0 - Interface Correta)**
- ✅ **Interface**: Layout original com 4 cards funcionando
- ✅ **Responsividade**: Mobile e desktop funcionando
- ✅ **Service Worker**: Registrado e carregando
- ✅ **JavaScript**: CRUD básico funcional
- ✅ **Docker**: Container rodando estável na porta 8080
- ✅ **Layout Original**: Mantida estrutura HTML funcional
- ✅ **PWA Base**: Meta tags e estrutura PWA implementada

### 🔧 **Correções Necessárias (v0.3.0)**

#### **🚨 Erros Identificados no Console:**
1. **Manifest.json Error 404**: 
   - Arquivo não está sendo servido corretamente
   - PWA não consegue instalar sem manifest
   
2. **Ícones Missing**:
   - `icon-144x144.png` - Error 404
   - `icon-192x192.png` - Error 404
   - Ícones necessários para PWA funcionar
   
3. **JavaScript Errors**:
   - `?status=pendente:382` - Erro de leitura
   - Problemas com filtros na URL

#### **📋 Próximas Correções (Ordem de Prioridade):**
1. **Corrigir rotas Nginx** para servir manifest.json
2. **Criar ícones PWA** (192x192, 144x144, etc.)
3. **Debugar JavaScript** de filtros e URL
4. **Testar instalação PWA** no celular
5. **Implementar notificações** funcionais
6. **Adicionar CRUD de receitas**

### 🔄 **Em Desenvolvimento**
- ☁️ **Sync Cloud**: Backup automático
- 📊 **Relatórios Avançados**: Análises mais detalhadas
- 🎯 **Metas**: Sistema de metas financeiras
- 💳 **Cartões**: Gestão de cartões de crédito
- 📅 **Recorrentes**: Despesas/receitas recorrentes

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Tailwind CSS
- **PWA**: Service Workers, Web App Manifest
- **Database**: IndexedDB (client-side)
- **Charts**: Chart.js / D3.js
- **Notifications**: Push API
- **Containerização**: Docker + Nginx

## 📁 Estrutura do Projeto

```
controle-financeiro-pwa/
├── 📄 README.md
├── 🐳 Dockerfile
├── 🐳 docker-compose.yml
├── 📦 package.json
├── src/
│   ├── 🏠 index.html
│   ├── 📱 manifest.json
│   ├── ⚙️ sw.js (Service Worker)
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── database.js
│   │   │   ├── despesas.js
│   │   │   ├── receitas.js
│   │   │   ├── notifications.js
│   │   │   ├── reports.js
│   │   │   └── utils.js
│   │   └── icons/
│   │       ├── icon-192x192.png
│   │       ├── icon-512x512.png
│   │       └── favicon.ico
└── docs/
    └── 📚 documentation.md
```

## 🧪 **Status do Projeto Atual**

### **✅ Funcionando Perfeitamente:**
- Interface responsiva (mobile e desktop)
- Layout com 4 cards corretos: Total Pendente, Total Pago, Atrasadas, Ainda Vai Vencer
- Service Worker registrado e ativo
- Container Docker estável
- JavaScript básico operacional
- Formulário de cadastro renderizando

### **⚠️ Funcionando com Erros:**
- PWA detecta tentativa de instalação mas falha (manifest 404)
- Console mostra erros de recursos não encontrados
- URLs com parâmetros causando problemas (?status=pendente)

### **❌ Não Funcionando:**
- Instalação PWA (depende do manifest)
- Ícones PWA (arquivos não existem)
- Notificações push (dependem dos ícones)
- Botão "Instalar como App" não aparece

### **🎯 Objetivo da v0.3.0:**
Transformar em PWA totalmente funcional e instalável no celular

## 📂 **Arquivos Criados (v0.2.0)**

### **✅ Infraestrutura Docker:**
- `Dockerfile` - Container Nginx otimizado para PWA
- `docker-compose.yml` - Orquestração com hot reload
- `nginx.conf` - Configuração específica para PWA (precisa ajustes)

### **✅ PWA Base:**
- `src/manifest.json` - Configuração PWA completa
- `src/sw.js` - Service Worker com cache inteligente
- `src/index.html` - Interface original + elementos PWA

### **❌ Faltando Criar:**
- `src/assets/icons/icon-192x192.png`
- `src/assets/icons/icon-144x144.png`
- `src/assets/icons/icon-512x512.png`
- Demais tamanhos de ícones para PWA

### **🔧 Precisam Ajustes:**
- `nginx.conf` - Rota para manifest.json
- `src/index.html` - Debugar JavaScript
- `src/sw.js` - Cache de ícones

---

## 🐳 Como Rodar com Docker

### **Pré-requisitos**
- Docker e Docker Compose instalados
- Git

### **Passos para executar:**

```bash
# 1. Clonar o repositório
git clone https://github.com/cristopherlima-dev/controle-financeiro-pwa.git
cd controle-financeiro-pwa

# 2. Buildar e subir o container
docker-compose up --build

# 3. Acessar no navegador
# http://localhost:8080
```

### **Comandos úteis:**

```bash
# Rodar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar os containers
docker-compose down

# Rebuild completo
docker-compose down
docker-compose up --build
```

## 💻 Desenvolvimento Local (sem Docker)

```bash
# 1. Clonar o repositório
git clone https://github.com/cristopherlima-dev/controle-financeiro-pwa.git
cd controle-financeiro-pwa

# 2. Servir arquivos (usando Python)
python3 -m http.server 8080

# Ou usando Node.js (se tiver npx instalado)
npx serve src -l 8080

# 3. Acessar no navegador
# http://localhost:8080
```

## 📱 Como Instalar como PWA

### **No Android (Chrome):**
1. Acesse a aplicação no Chrome
2. Toque no menu (3 pontos)
3. Toque em "Adicionar à tela inicial"
4. Confirme a instalação

### **No iOS (Safari):**
1. Acesse a aplicação no Safari
2. Toque no botão de compartilhar
3. Toque em "Adicionar à Tela de Início"
4. Confirme a instalação

### **No Desktop (Chrome/Edge):**
1. Acesse a aplicação
2. Clique no ícone de instalação na barra de endereços
3. Clique em "Instalar"

## 🔔 Configurando Notificações

As notificações funcionam automaticamente quando:
- O app é instalado como PWA
- O usuário permite notificações
- Há despesas vencendo em 1 dia
- Há despesas já vencidas

## 📊 Funcionalidades Principais

### **💸 Gestão de Despesas**
- Adicionar, editar, excluir despesas
- Marcar como paga/pendente
- Categorização automática
- Anexar comprovantes (futuro)

### **💰 Gestão de Receitas**
- Salários, freelances, investimentos
- Categorização de fontes de renda
- Controle de recebimentos

### **📈 Relatórios e Análises**
- Gráficos de gastos por categoria
- Evolução mensal/anual
- Comparativo receitas vs despesas
- Projeções e tendências

### **🎯 Metas Financeiras**
- Definir orçamentos por categoria
- Acompanhar progresso
- Alertas de limite

## 📝 Roadmap

- [x] **V0.1**: Setup Docker + Nginx + Service Worker ✅
- [x] **V0.2**: Interface original funcionando + PWA base ✅
- [ ] **V0.3**: Corrigir manifest.json + ícones + PWA instalável 🔄
- [ ] **V0.4**: CRUD despesas 100% funcional + notificações
- [ ] **V0.5**: Adicionar receitas + categorias
- [ ] **V1.0**: PWA completo (despesas + receitas + relatórios)
- [ ] **V1.1**: Relatórios avançados + gráficos
- [ ] **V1.2**: Backup em nuvem + sincronização  
- [ ] **V2.0**: Multi-usuário + integrações
- [ ] **V2.1**: Integração bancária
- [ ] **V2.2**: IA para categorização automática

### **🔥 Próxima Sprint (v0.3.0):**
1. Corrigir nginx.conf para servir manifest.json
2. Gerar ícones PWA (192x192, 144x144, etc.)
3. Testar instalação PWA no celular
4. Debugar erros JavaScript
5. Implementar notificações básicas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Cristopher Lima**
- GitHub: [@cristopherlima-dev](https://github.com/cristopherlima-dev)
- LinkedIn: [Cristopher Lima](https://www.linkedin.com/in/cristopherlima-dev/)

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!