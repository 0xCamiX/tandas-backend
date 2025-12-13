#!/bin/bash

# Manual deployment script
# Use this to deploy manually to EC2 if GitHub Actions fails

set -e

echo "Manual Deployment to EC2"
echo "==========================="

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

# Verificar variables de entorno requeridas
if [ -z "$EC2_HOST" ] || [ -z "$EC2_USER" ] || [ -z "$SSH_KEY_PATH" ]; then
    print_error "Required environment variables not set!"
    echo ""
    echo "Please set the following variables:"
    echo "  export EC2_HOST=your-ec2-ip"
    echo "  export EC2_USER=ubuntu"
    echo "  export SSH_KEY_PATH=/path/to/your-key.pem"
    exit 1
fi

print_info "EC2 Host: $EC2_HOST"
print_info "EC2 User: $EC2_USER"

# Verificar que existe la clave SSH
if [ ! -f "$SSH_KEY_PATH" ]; then
    print_error "SSH key not found at: $SSH_KEY_PATH"
    exit 1
fi

# Verificar permisos de la clave SSH
chmod 600 "$SSH_KEY_PATH"
print_success "SSH key permissions verified"

# Crear archivo .env.prod si no existe
if [ ! -f .env.prod ]; then
    print_info "Creating .env.prod from .env..."
    if [ -f .env ]; then
        cp .env .env.prod
    else
        print_error ".env file not found!"
        exit 1
    fi
fi

# Copiar archivos necesarios
print_info "Copying files to EC2..."

# Crear directorio en EC2 si no existe
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    "$EC2_USER@$EC2_HOST" "mkdir -p ~/app/nginx/conf.d"

# Copiar docker-compose
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    docker-compose.prod.yml "$EC2_USER@$EC2_HOST:~/app/docker-compose.yml"
print_success "docker-compose.yml copied"

# Copiar .env
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    .env.prod "$EC2_USER@$EC2_HOST:~/app/.env"
print_success ".env copied"

# Copiar scripts
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    scripts/ec2/deploy.sh "$EC2_USER@$EC2_HOST:~/app/deploy.sh"
print_success "deploy.sh copied"

# Copiar configuración nginx
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    nginx/nginx.conf "$EC2_USER@$EC2_HOST:~/app/nginx/nginx.conf"
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    nginx/conf.d/default.conf "$EC2_USER@$EC2_HOST:~/app/nginx/conf.d/default.conf"
print_success "nginx configuration copied"

# Ejecutar deployment en EC2
print_info "Running deployment on EC2..."
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    "$EC2_USER@$EC2_HOST" << 'ENDSSH'
    cd ~/app
    chmod +x deploy.sh
    ./deploy.sh
ENDSSH

# Verificar deployment
print_info "Verifying deployment..."
sleep 5

if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    "$EC2_USER@$EC2_HOST" "curl -f http://localhost:3000/health" > /dev/null 2>&1; then
    print_success "Health check passed"
else
    print_error "Health check failed"
    exit 1
fi

echo ""
echo "==========================="
print_success "Manual deployment completed!"
echo "==========================="
echo ""
echo "Verify deployment:"
echo "  curl http://$EC2_HOST/health"
echo ""
echo "View logs:"
echo "  ssh -i $SSH_KEY_PATH $EC2_USER@$EC2_HOST 'cd ~/app && docker compose logs -f'"

