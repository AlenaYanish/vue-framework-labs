# Build stage: використовуємо офіційний образ Node.js для збірки Vue додатку
FROM node:latest AS build-stage
# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app
# Копіюємо тільки package.json та package-lock.json для кешування npm install
COPY package*.json ./
# Встановлюємо залежності
RUN npm install
# Копіюємо весь код проекту у контейнер
COPY . .
# Збираємо production-версію Vue додатку
RUN npm run build

# Production stage: використовуємо легкий Nginx для сервінгу статичних файлів
FROM nginx:stable-alpine AS production-stage
# Копіюємо збірку з build-stage у Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Відкриваємо порт 80 для доступу до веб-додатку
EXPOSE 80
# Команда для запуску Nginx у foreground (обов'язково для Docker)
CMD ["nginx", "-g", "daemon off;"]
