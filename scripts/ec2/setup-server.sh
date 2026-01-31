#!/bin/bash

# EC2 Server Setup Script for Amazon Linux 2023
# Run this script once on a fresh EC2 instance to set up the environment

set -e

echo "Setting up EC2 server for YAKU Backend (Amazon Linux 2023)"
echo "============================================"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}success: $1${NC}"
}

print_info() {
    echo -e "${YELLOW}info: $1${NC}"
}

# Actualizar sistema
print_info "Updating system packages..."
sudo yum update -y
print_success "System updated"

# Instalar utilidades básicas
print_info "Installing basic utilities..."
sudo yum install -y \
    wget \
    git \
    vim \
    htop \
    unzip \
    jq \
    tar \
    gzip
print_success "Basic utilities installed"

# Instalar Docker
print_info "Installing Docker..."
if ! command -v docker &> /dev/null; then
    sudo yum install docker -y
    
    # Iniciar Docker
    sudo systemctl start docker
    
    # Habilitar Docker en el arranque
    sudo systemctl enable docker
    
    # Agregar usuario actual al grupo docker
    sudo usermod -aG docker $USER
    
    print_success "Docker installed"
else
    print_success "Docker already installed"
    # Asegurar que Docker está corriendo
    sudo systemctl start docker 2>/dev/null || true
    sudo systemctl enable docker 2>/dev/null || true
fi

# Instalar Docker Compose V2
print_info "Installing Docker Compose V2..."
if docker compose version &> /dev/null; then
    print_success "Docker Compose V2 is already available"
else
    print_info "Downloading and installing Docker Compose..."
    sudo mkdir -p /usr/libexec/docker/cli-plugins/
    sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose
    sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
    print_success "Docker Compose V2 installed"
fi

# Instalar Bun runtime (opcional, pero útil para debugging)
print_info "Installing Bun runtime..."
if ! command -v bun &> /dev/null; then
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    print_success "Bun installed"
else
    print_success "Bun already installed"
fi

# Configurar firewall (firewalld en Amazon Linux)
print_info "Configuring firewall..."
if systemctl is-active --quiet firewalld; then
    print_info "Firewalld is active, configuring rules..."
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-port=3000/tcp
    sudo firewall-cmd --reload
    print_success "Firewall configured with firewalld"
else
    print_info "Firewalld not active, using iptables rules..."
    # Permitir puertos necesarios
    sudo iptables -I INPUT -p tcp --dport 22 -j ACCEPT
    sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
    sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
    sudo iptables -I INPUT -p tcp --dport 3000 -j ACCEPT
    # Guardar reglas (Amazon Linux 2023)
    sudo service iptables save 2>/dev/null || true
    print_success "Firewall configured with iptables"
fi

# Crear directorios de la aplicación
print_info "Creating application directories..."
mkdir -p ~/app
mkdir -p ~/app/logs
mkdir -p ~/app/nginx/conf.d
print_success "Directories created"

# Instalar y configurar cron (para log rotation y otros)
print_info "Setting up cron..."
if ! command -v crontab &> /dev/null; then
    sudo yum install cronie -y
    sudo systemctl enable crond.service
    sudo systemctl start crond.service
    print_success "Cron installed and started"
else
    print_success "Cron already installed"
fi

# Configurar log rotation
print_info "Configuring log rotation..."
sudo tee /etc/logrotate.d/yaku-backend > /dev/null << 'EOF'
/home/*/app/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0644 ec2-user ec2-user
    sharedscripts
}
EOF
print_success "Log rotation configured"

# Configurar límites del sistema
print_info "Configuring system limits..."
sudo tee -a /etc/security/limits.conf > /dev/null << 'EOF'
* soft nofile 65536
* hard nofile 65536
* soft nproc 32768
* hard nproc 32768
EOF
print_success "System limits configured"

# Configurar swap si no existe
print_info "Checking swap..."
if [ $(swapon --show | wc -l) -eq 0 ]; then
    print_info "Creating swap file (2GB)..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    print_success "Swap created"
else
    print_success "Swap already configured"
fi

# Verificar estado de Docker
print_info "Verifying Docker status..."
if sudo systemctl is-active --quiet docker; then
    print_success "Docker is running"
else
    print_info "Starting Docker..."
    sudo systemctl start docker
    print_success "Docker started"
fi

if sudo systemctl is-enabled --quiet docker; then
    print_success "Docker auto-start is enabled"
else
    sudo systemctl enable docker
    print_success "Docker auto-start enabled"
fi

# Información final
echo ""
echo "============================================"
print_success "EC2 Server setup completed!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. IMPORTANT: Log out and log back in for Docker group changes to take effect"
echo "     exit"
echo "     ssh -i your-key.pem ec2-user@your-ec2-ip"
echo ""
echo "  2. Copy your .env file to ~/app/.env"
echo "     nano ~/app/.env"
echo ""
echo "  3. Run setup-systemd.sh to configure auto-start"
echo "     ./setup-systemd.sh"
echo ""
echo "  4. (Optional) Run install-watchtower.sh for auto-updates"
echo "     ./install-watchtower.sh"
echo ""
echo "Verify installation:"
echo "  docker --version"
echo "  docker compose version"
echo "  bun --version"
echo ""
echo "Note: You're using Amazon Linux 2023"
echo "      Default user is 'ec2-user' (not 'ubuntu')"
echo ""

