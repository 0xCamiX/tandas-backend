#!/bin/bash

# Install Watchtower for automatic container updates
# Watchtower monitors Docker Hub for new images and auto-updates containers

set -e

echo "🔄 Installing Watchtower"
echo "======================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}success: $1${NC}"
}

print_info() {
    echo -e "${YELLOW}info: $1${NC}"
}

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "error: Docker is not installed. Please run setup-server.sh first."
    exit 1
fi

# Detener Watchtower si ya está corriendo
if docker ps | grep watchtower > /dev/null; then
    print_info "Stopping existing Watchtower..."
    docker stop watchtower
    docker rm watchtower
fi

# Ejecutar Watchtower
print_info "Starting Watchtower..."
docker run -d \
    --name watchtower \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -e WATCHTOWER_CLEANUP=true \
    -e WATCHTOWER_POLL_INTERVAL=300 \
    -e WATCHTOWER_ROLLING_RESTART=true \
    -e WATCHTOWER_INCLUDE_STOPPED=false \
    -e WATCHTOWER_REVIVE_STOPPED=false \
    -e WATCHTOWER_ENABLE_LIFECYCLE_HOOKS=true \
    -e WATCHTOWER_HTTP_API_METRICS=true \
    -e WATCHTOWER_HTTP_API_TOKEN=watchtower \
    containrrr/watchtower

print_success "Watchtower installed and started"

# Verificar estado
sleep 3
if docker ps | grep watchtower > /dev/null; then
    print_success "Watchtower is running"
else
    echo "error: Watchtower failed to start"
    exit 1
fi

echo ""
echo "======================="
print_success "Watchtower setup completed!"
echo "======================="
echo ""
echo "Watchtower Configuration:"
echo "  - Poll interval: 5 minutes (300 seconds)"
echo "  - Auto cleanup: enabled"
echo "  - Rolling restart: enabled"
echo ""
echo "View Watchtower logs:"
echo "  docker logs -f watchtower"
echo ""
echo "Note: Watchtower will automatically update containers when"
echo "    new images are pushed to Docker Hub. Make sure your CI/CD"
echo "    pipeline properly tags and pushes images."
echo ""
echo "To stop Watchtower:"
echo "  docker stop watchtower"
echo "  docker rm watchtower"

