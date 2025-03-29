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
FROM node:18-alpine

# Install nginx and serve
RUN apk add --no-cache nginx curl && \
    npm install -g serve

WORKDIR /app

# Copy Vite build output
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Copy nginx configuration
COPY nginx.production.conf /etc/nginx/conf.d/default.conf

# Create nginx cache directory
RUN mkdir -p /var/cache/nginx

# Copy and set up entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
