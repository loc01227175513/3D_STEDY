#!/bin/bash
# Pull latest image
docker pull taiphamdac/3d_stedy:latest

# Ensure the directory exists with correct permissions
mkdir -p /root/nginx

# Create the nginx configuration file
cat > /root/nginx/nginx.conf << 'EOF'
server {
    listen 3000;
    server_name _;
    root /app/dist;
    # Compression
    gzip on;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_buffers 16 8k;
    # Health check endpoint
    location /health {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
    # GraphQL API endpoint
    location /graphql {
        proxy_pass http://137.184.13.30:3000/graphql;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    # All other requests go to the static build
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Create docker-compose.yml with proper formatting
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  app:
    image: taiphamdac/3d_stedy:latest
    ports:
      - "3000:3000"
    restart: always
    environment:
      NODE_ENV: production
      VITE_PUBLIC_API_DOMAIN: http://137.184.13.30:3000
      VITE_PUBLIC_API_URL: /graphql
      PORT: 3000
      HOST: 0.0.0.0
    volumes:
      - /root/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    networks:
      - app_network
    read_only: false
    tmpfs:
      - /tmp
      - /var/cache/nginx

networks:
  app_network:
    driver: bridge
EOF

# Stop and remove existing containers
docker-compose down || true

# Clean up unused resources
docker system prune -f

# Start the new deployment
docker-compose up -d

# Wait for container to start
echo "Waiting for container to start..."
sleep 30

# Check container status
if ! docker ps | grep -q "app-1"; then
  echo "Container failed to start"
  docker-compose logs
  exit 1
fi

# Health check
echo "Checking container health..."
for i in {1..20}; do
  if curl -f http://localhost:3000/health; then
    echo "Health check passed!"
    break
  fi
  if [ $i -eq 20 ]; then
    echo "Health check failed"
    docker-compose logs
    exit 1
  fi
  echo "Waiting for service to be ready... ($i/20)"
  sleep 5
done 