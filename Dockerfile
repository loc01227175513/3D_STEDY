# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Runner
FROM nginx:alpine

WORKDIR /app

# Copy Vite build output
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Copy nginx configuration
COPY nginx.production.conf /etc/nginx/conf.d/default.conf

# Create nginx cache directory
RUN mkdir -p /var/cache/nginx

# Copy entrypoint script
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh && \
    sed -i 's/\r$//' /app/docker-entrypoint.sh

EXPOSE 80

CMD ["/bin/sh", "/app/docker-entrypoint.sh"]
