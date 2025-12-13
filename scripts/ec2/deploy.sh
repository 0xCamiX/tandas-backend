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

# Esperar a que los servicios estén listos
print_info "Waiting for services to start..."
sleep 10

# Verificar que los contenedores están corriendo
print_info "Checking container status..."
if docker compose ps | grep -E "(tandas-backend|tandas-nginx)" | grep "Up" > /dev/null; then
    print_success "Containers are running"
else
    print_error "Containers failed to start"
    print_info "Container status:"
    docker compose ps
    print_info "Container logs:"
    docker compose logs --tail=50
    exit 1
fi

# Verificar health endpoint a través de nginx
print_info "Testing health endpoint via nginx..."
MAX_RETRIES=15
RETRY_COUNT=0

until curl -f http://localhost/health > /dev/null 2>&1 || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    echo -n "."
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
done
echo ""

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    print_error "Health check failed"
    print_info "Container logs:"
    docker compose logs --tail=50
    exit 1
fi

print_success "Health check passed - Application is responding"

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

