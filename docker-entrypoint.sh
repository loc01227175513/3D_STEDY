#!/bin/sh
set -e

echo "Starting Nginx..."

# Start Nginx
nginx -g 'daemon off;' 