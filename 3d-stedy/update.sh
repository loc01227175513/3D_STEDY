#!/bin/bash

echo "Đang cập nhật container 3D-STEDY..."

# Pull image mới
docker pull taiphamdac/3d-stedy:latest

# Tìm và dừng container cũ
CONTAINER_ID=$(docker ps -q --filter ancestor=taiphamdac/3d-stedy:latest)
if [ ! -z "$CONTAINER_ID" ]; then
    echo "Dừng container cũ: $CONTAINER_ID"
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
fi

# Chạy container mới
echo "Khởi động container mới..."
docker run -d -p 3000:3000 taiphamdac/3d-stedy:latest

echo "✓ Hoàn tất cập nhật!" 