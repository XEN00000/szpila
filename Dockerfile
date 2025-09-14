# 1) Build etapu frontendu
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2) Etap serwowania przez Nginx
FROM nginx:alpine

# Własna konfiguracja dla SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Skopiuj pliki buildu do katalogu Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
