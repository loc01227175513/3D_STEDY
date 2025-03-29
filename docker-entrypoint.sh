#!/bin/sh

# Start static file server for dev purposes
echo "Starting static file server..."
cd dist && npx serve -l 3000 &

# Wait for server to be ready
wait_for_server() {
    echo "Waiting for static server to start..."
    while true; do
        if curl -s http://localhost:3000 > /dev/null; then
            echo "✓ Static server is ready!"
            break
        fi
        echo "⌛ Waiting for server... (Ctrl+C to stop)"
        sleep 2
    done
}

wait_for_server

# Start Nginx
echo "Starting Nginx..."
nginx -g 'daemon off;' 