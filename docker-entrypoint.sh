#!/bin/sh
set -e

# Echo for debugging
echo "Starting container setup..."

# Optional: Replace API domain in configuration if provided via environment
if [ ! -z "$VITE_PUBLIC_API_DOMAIN" ]; then
  echo "Setting API domain to: $VITE_PUBLIC_API_DOMAIN"
  # Replace in nginx configuration
  sed -i "s|http://137.184.13.30:3000|$VITE_PUBLIC_API_DOMAIN|g" /etc/nginx/conf.d/default.conf
fi

# Ensure permissions are correct
echo "Setting permissions..."
chown -R nginx:nginx /app/dist

# Echo for debugging
echo "Starting Nginx..."

# Start Nginx
nginx -g 'daemon off;' 