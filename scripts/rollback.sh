#!/bin/bash

# Rollback script for TANDAS Backend
# This script rolls back to a previous Docker image version

set -e

echo "Rolling back TANDAS Backend"
echo "=============================="

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Verificar argumentos
if [ -z "$1" ]; then
    print_error "Usage: ./rollback.sh <image-tag>"
    echo ""
    echo "Available tags:"
    docker images | grep tandas-backend || echo "No images found"
    exit 1
fi

IMAGE_TAG=$1

print_info "Rolling back to image tag: $IMAGE_TAG"

# Verificar que la imagen existe
if ! docker images | grep -q "$IMAGE_TAG"; then
    print_error "Image with tag $IMAGE_TAG not found locally"
    print_info "Attempting to pull from Docker Hub..."
    
    if ! docker pull ${DOCKERHUB_USERNAME:-}/tandas-backend:$IMAGE_TAG; then
        print_error "Failed to pull image from Docker Hub"
        exit 1
    fi
fi

# Stop contenedores actuales
print_info "Stopping current containers..."
docker compose down --timeout 30

# Actualizar docker-compose para usar el tag específico
print_info "Updating docker-compose configuration..."
export IMAGE_TAG=$IMAGE_TAG

# Start con la imagen anterior
print_info "Starting containers with image: $IMAGE_TAG"
docker compose up -d

# Esperar a que el servicio esté listo
print_info "Waiting for service to be healthy..."
MAX_RETRIES=30
RETRY_COUNT=0

until docker compose ps | grep "healthy" > /dev/null || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    echo -n "."
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
done
echo ""

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    print_error "Service did not become healthy after rollback"
    docker compose logs --tail=50
    exit 1
fi

print_success "Service is healthy"

# Verificar health endpoint
print_info "Testing health endpoint..."
sleep 3
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    print_success "Health check passed"
else
    print_error "Health check failed"
    docker compose logs --tail=50
    exit 1
fi

echo ""
echo "=============================="
print_success "Rollback completed!"
echo "=============================="
echo ""
echo "Current Status:"
docker compose ps
echo ""
echo "🔍 Verify: curl http://localhost:3000/health"

