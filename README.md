# 💰 Controle Financeiro PWA

Um Progressive Web App moderno e responsivo para controle financeiro pessoal, com notificações push, relatórios avançados e funcionalidade offline.

## 🚀 Funcionalidades

### ✅ **Implementadas**
- 📱 **PWA**: Instalável no celular como app nativo
- 💾 **Offline First**: Funciona sem internet
- 📊 **Dashboard**: Visão geral das finanças
- 💸 **Despesas**: CRUD completo de despesas
- 💰 **Receitas**: Gestão de receitas
- 🏷️ **Categorias**: Sistema de categorização
- 🔍 **Filtros**: Busca e filtros avançados
- 📈 **Relatórios**: Gráficos e análises
- 🔔 **Notificações**: Despesas vencendo/vencidas
- 🌙 **Dark Mode**: Tema escuro/claro
- 📱 **Responsivo**: Funciona em todos os dispositivos

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

- [ ] **V1.0**: Funcionalidades básicas (despesas, receitas, categorias)
- [ ] **V1.1**: Notificações push
- [ ] **V1.2**: Relatórios avançados
- [ ] **V1.3**: Backup em nuvem
- [ ] **V2.0**: Multi-usuário e sincronização
- [ ] **V2.1**: Integração bancária
- [ ] **V2.2**: IA para categorização automática

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Cristopher Lima**
- GitHub: [@cristopherlima-dev](https://github.com/cristopherlima-dev)
- LinkedIn: [Cristopher Lima](https://www.linkedin.com/in/cristopherlima-dev/)

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!