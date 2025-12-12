#!/bin/bash

# Deployment Script for EC2
# This script is run by GitHub Actions or manually to deploy the application

set -e

echo "Deploying TANDAS Backend"
echo "==========================="

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}success: $1${NC}"
}

print_error() {
    echo -e "${RED}error: $1${NC}"
}

print_info() {
    echo -e "${YELLOW}info: $1${NC}"
}

# Cambiar al directorio de la aplicación
cd ~/app

# Verificar que existen los archivos necesarios
if [ ! -f docker-compose.yml ]; then
    print_error "docker-compose.yml not found!"
    exit 1
fi

if [ ! -f .env ]; then
    print_error ".env file not found!"
    exit 1
fi

print_success "Configuration files found"

# Backup de la versión actual (para rollback)
print_info "Creating backup..."
BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).txt"
docker compose images > logs/$BACKUP_FILE 2>/dev/null || true
print_success "Backup created: $BACKUP_FILE"

# Pull de la nueva imagen
print_info "Pulling latest image from Docker Hub..."
if docker compose pull; then
    print_success "Image pulled successfully"
else
    print_error "Failed to pull image"
    exit 1
fi

# Stop de contenedores actuales (con timeout)
print_info "Stopping current containers..."
docker compose down --timeout 30 || true
print_success "Containers stopped"

# Start de nuevos contenedores
print_info "Starting new containers..."
if docker compose up -d; then
    print_success "Containers started"
else
    print_error "Failed to start containers"
    print_info "Attempting rollback..."
    docker compose down
    exit 1
fi

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
    print_error "Service did not become healthy in time"
    print_info "Container logs:"
    docker compose logs --tail=50
    print_info "Attempting rollback..."
    docker compose down
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
    print_info "Container logs:"
    docker compose logs --tail=50
    exit 1
fi

# Limpiar imágenes antiguas
print_info "Cleaning up old images..."
docker image prune -af --filter "until=24h" || true
print_success "Cleanup completed"

# Mostrar estado
print_info "Current container status:"
docker compose ps

# Log del deployment
echo "[$(date)] Deployment successful" >> logs/deployment.log

echo ""
echo "==========================="
print_success "Deployment completed!"
echo "==========================="
echo ""
echo "Service Status:"
docker compose ps
echo ""
echo "View logs: docker compose logs -f"
echo "Health: curl http://localhost:3000/health"

