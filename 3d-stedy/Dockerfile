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
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["node", "server.js"]

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine
ARG env

# Copy the built files from the build stage
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.production.conf /etc/nginx/conf.d/default.conf

# Map the SSL certificates from the host
VOLUME ["/etc/letsencrypt"]

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Add a health check to ensure the web server is alive
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:80 || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
