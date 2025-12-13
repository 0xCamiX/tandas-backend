#!/bin/bash

# Script de verificación de build local
# Este script verifica que el build de Docker funciona correctamente

set -e

echo "🔍 Verificación de Build - TANDAS Backend"
echo "=========================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Verificar que existe .env
if [ ! -f .env ]; then
    print_error ".env file not found!"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_info "Please edit .env with your actual values"
        exit 1
    else
        print_error ".env.example not found either!"
        exit 1
    fi
fi
print_success ".env file exists"

# Verificar Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed"
    exit 1
fi
print_success "Docker is installed"

# Verificar Docker Compose
if ! command -v docker compose &> /dev/null; then
    print_error "Docker Compose is not installed"
    exit 1
fi
print_success "Docker Compose is installed"

# Limpiar contenedores anteriores si existen
print_info "Cleaning up previous containers..."
docker compose down -v 2>/dev/null || true

# Build de la imagen
print_info "Building Docker image..."
if docker compose build --no-cache; then
    print_success "Docker image built successfully"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Iniciar servicios
print_info "Starting services..."
if docker compose up -d; then
    print_success "Services started"
else
    print_error "Failed to start services"
    exit 1
fi

# Esperar a que el servicio esté listo
print_info "Waiting for service to be healthy..."
sleep 5

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
    docker compose logs
    docker compose down
    exit 1
fi
print_success "Service is healthy"

# Verificar health endpoint
print_info "Testing health endpoint..."
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    print_success "Health endpoint responding"
    echo ""
    echo "Health check response:"
    curl -s http://localhost:3000/health | jq '.' 2>/dev/null || curl -s http://localhost:3000/health
else
    print_error "Health endpoint not responding"
    docker compose logs
    docker compose down
    exit 1
fi

# Verificar endpoint raíz
print_info "Testing root endpoint..."
if curl -f http://localhost:3000/ > /dev/null 2>&1; then
    print_success "Root endpoint responding"
else
    print_error "Root endpoint not responding"
fi

# Mostrar logs
echo ""
print_info "Recent logs:"
docker compose logs --tail=20

# Cleanup
echo ""
print_info "Stopping services..."
docker compose down

echo ""
echo "=========================================="
print_success "All checks passed!"
echo "=========================================="
echo ""
print_info "You can now run: docker compose up -d"

