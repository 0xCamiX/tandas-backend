#!/bin/bash

# Setup systemd service for TANDAS Backend
# This ensures the application starts automatically on boot and restarts on failure

set -e

echo "⚙️  Setting up systemd service"
echo "=============================="

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

# Obtener el directorio de la aplicación y usuario actual
APP_DIR="$HOME/app"
USER_NAME=$(whoami)

print_info "Creating systemd service file..."

# Crear archivo de servicio systemd
sudo tee /etc/systemd/system/tandas-backend.service > /dev/null << EOF
[Unit]
Description=TANDAS Backend API Service
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
User=$USER_NAME
Group=$USER_NAME

# Environment
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Start command
ExecStart=/usr/bin/docker compose -f $APP_DIR/docker-compose.yml up -d

# Stop command
ExecStop=/usr/bin/docker compose -f $APP_DIR/docker-compose.yml down

# Restart policy
Restart=on-failure
RestartSec=10s

# Timeout settings
TimeoutStartSec=300
TimeoutStopSec=60

# Security settings
PrivateTmp=yes
NoNewPrivileges=yes

# Resource limits
LimitNOFILE=65536
LimitNPROC=32768

[Install]
WantedBy=multi-user.target
EOF

print_success "Service file created"

# Recargar systemd
print_info "Reloading systemd daemon..."
sudo systemctl daemon-reload
print_success "Daemon reloaded"

# Habilitar el servicio
print_info "Enabling service..."
sudo systemctl enable tandas-backend.service
print_success "Service enabled"

# Iniciar el servicio
print_info "Starting service..."
if sudo systemctl start tandas-backend.service; then
    print_success "Service started"
else
    echo "error: Service failed to start. Check logs with: sudo journalctl -u tandas-backend.service -f"
fi

# Verificar estado
sleep 5
print_info "Service status:"
sudo systemctl status tandas-backend.service --no-pager || true

echo ""
echo "=============================="
print_success "systemd setup completed!"
echo "=============================="
echo ""
echo "Useful commands:"
echo "  sudo systemctl status tandas-backend    # Check status"
echo "  sudo systemctl start tandas-backend     # Start service"
echo "  sudo systemctl stop tandas-backend      # Stop service"
echo "  sudo systemctl restart tandas-backend   # Restart service"
echo "  sudo journalctl -u tandas-backend -f    # View logs"
echo ""
echo "The service will now:"
echo "  - Start automatically on boot"
echo "  - Restart automatically on failure"
echo "  - Run with proper resource limits"

