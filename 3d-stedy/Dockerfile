# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Copy environment file
COPY .env.local ./.env.local

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV DISABLE_ESLINT_PLUGIN=true
ENV DISABLE_TYPE_CHECK=true
ENV CI=true
ENV GENERATE_SOURCEMAP=false
ENV TSC_COMPILE_ON_ERROR=true
ENV ESLINT_NO_DEV_ERRORS=true
ENV NEXT_IGNORE_TYPE_CHECK=true
ENV NEXT_IGNORE_ESLINT=true

# Build the app
RUN CI=true DISABLE_ESLINT_PLUGIN=true DISABLE_TYPE_CHECK=true NEXT_IGNORE_TYPE_CHECK=true NEXT_IGNORE_ESLINT=true npm run build

# Production stage
FROM nginx:alpine

# Copy build output
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 