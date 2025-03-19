#!/bin/sh

# Start Next.js
echo "Starting Next.js server..."
node server.js &

# Wait for Next.js to be ready
wait_for_nextjs() {
    echo "Đang đợi Next.js khởi động..."
    while true; do
        if curl -s http://localhost:3000 > /dev/null; then
            echo "✓ Next.js đã sẵn sàng!"
            break
        fi
        echo "⌛ Đang đợi Next.js... (Ctrl+C để dừng)"
        sleep 2
    done
}

wait_for_nextjs

# Start Nginx
echo "Khởi động Nginx..."
nginx -g 'daemon off;' 