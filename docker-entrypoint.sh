#!/bin/sh
set -e

# Echo for debugging
echo "Starting container setup..."

# This is important: we do NOT want to replace the API domain in the NGINX configuration
# The front-end is served on port 3000 but should make API calls to 137.184.13.30:3000
echo "Using API domain: http://137.184.13.30:3000"

# Ensure permissions are correct
echo "Setting permissions..."
chown -R nginx:nginx /app/dist

# Echo for debugging
echo "Starting Nginx..."

# Start Nginx
nginx -g 'daemon off;' 