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
# Update API endpoint in .env.production
RUN sed -i 's|VITE_PUBLIC_API_DOMAIN="http://64.23.206.54:3000"|VITE_PUBLIC_API_DOMAIN="http://137.184.13.30:3000"|g' .env.production
RUN npm run build

# Stage 3: Runner
FROM nginx:alpine

# Copy Vite build output to correct location
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.production.conf /etc/nginx/conf.d/default.conf

# Add health check endpoint
RUN mkdir -p /usr/share/nginx/html/health && \
    echo "OK" > /usr/share/nginx/html/health/index.html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
