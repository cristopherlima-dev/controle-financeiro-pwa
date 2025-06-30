# Dockerfile para Controle Financeiro PWA
# Multi-stage build para otimização

# Estágio 1: Build (se precisarmos de build tools futuramente)
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração (se existirem)
COPY package*.json ./

# Instalar dependências apenas se houver package.json
RUN if [ -f package.json ]; then npm ci --only=production; fi

# Copiar código fonte
COPY src/ ./src/

# Estágio 2: Produção com Nginx
FROM nginx:alpine AS production

# Informações do mantenedor
LABEL maintainer="cristopherlima-dev <cristopher.lima.ti.dev@gmail.com>"
LABEL description="PWA para Controle Financeiro Pessoal"
LABEL version="1.0.0"

# Instalar curl para health checks
RUN apk add --no-cache curl

# Remover configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copiar arquivos da aplicação
COPY --from=builder /app/src /usr/share/nginx/html

# Copiar configuração customizada do Nginx para PWA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-user -g nginx-user nginx-user

# Ajustar permissões
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d

# Criar diretórios necessários
RUN touch /var/run/nginx.pid && \
    chown -R nginx-user:nginx-user /var/run/nginx.pid

# Mudar para usuário não-root
USER nginx-user

# Expor porta 8080 (não-privilegiada)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]