#!/bin/bash
set -e

echo "Starting services..."

# Start static file server
cd /app/dist
npx serve -l 3000 &

# Start Nginx
nginx -g 'daemon off;' 