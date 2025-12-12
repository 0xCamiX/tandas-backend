# 🚀 Quick Start - TANDAS Backend Deployment

## Para el Usuario: Pasos Rápidos de Despliegue

Este documento contiene los pasos esenciales para poner tu aplicación en producción.

---

## 📋 Pre-requisitos

- [ ] Instancia EC2 corriendo (Ubuntu 20.04+)
- [ ] Base de datos PostgreSQL externa configurada
- [ ] Cuenta de Docker Hub
- [ ] Acceso SSH a EC2
- [ ] Repositorio en GitHub

---

## 🔧 Paso 1: Configurar EC2 (Una sola vez)

### Conectar a EC2

**Nota**: Este proyecto usa **Amazon Linux 2023**. El usuario default es `ec2-user` (NO `ubuntu`).

```bash
# Para Amazon Linux 2023
ssh -i tu-llave.pem ec2-user@tu-ip-ec2

# Si usas Ubuntu, sería:
# ssh -i tu-llave.pem ubuntu@tu-ip-ec2
```

### Copiar y ejecutar script de setup

```bash
# Desde tu máquina local, copia el script
scp -i tu-llave.pem scripts/ec2/setup-server.sh ec2-user@tu-ip-ec2:~/

# Conecta a EC2 y ejecuta
ssh -i tu-llave.pem ec2-user@tu-ip-ec2
chmod +x setup-server.sh
./setup-server.sh

# IMPORTANTE: Desloguéate y vuelve a loguearte para aplicar permisos de Docker
exit
ssh -i tu-llave.pem ec2-user@tu-ip-ec2

# Verifica que Docker funciona sin sudo
docker ps
docker compose version
```

### Crear archivo .env en EC2

```bash
nano ~/app/.env
```

Copia y completa esto:

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@host:5432/database
BETTER_AUTH_SECRET=$(openssl rand -base64 32)
BETTER_AUTH_URL=http://tu-ip-ec2:3000
NEXT_PUBLIC_URL=http://tu-frontend-url
```

Guarda con: `Ctrl+X`, `Y`, `Enter`

### Configurar inicio automático

```bash
# Descarga el script de systemd
wget https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/scripts/ec2/setup-systemd.sh
chmod +x setup-systemd.sh
./setup-systemd.sh
```

### (Opcional) Instalar Watchtower para auto-updates

```bash
wget https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/scripts/ec2/install-watchtower.sh
chmod +x install-watchtower.sh
./install-watchtower.sh
```

---

## 🔑 Paso 2: Configurar Docker Hub

1. Ve a https://hub.docker.com/
2. Crea una cuenta (si no tienes)
3. Ve a Account Settings → Security
4. Click "New Access Token"
5. Nombra: "GitHub Actions"
6. Copia el token generado

---

## 🐙 Paso 3: Configurar GitHub Secrets

Ve a tu repositorio en GitHub:

**Settings → Secrets and variables → Actions → New repository secret**

Agrega estos secrets:

| Nombre | Valor |
|--------|-------|
| `DOCKERHUB_USERNAME` | Tu usuario de Docker Hub |
| `DOCKERHUB_TOKEN` | El token que generaste |
| `EC2_HOST` | La IP pública de tu EC2 |
| `EC2_USER` | `ec2-user` (Amazon Linux 2023) |
| `EC2_SSH_KEY` | Todo el contenido de tu archivo .pem |
| `DATABASE_URL` | Tu URL de PostgreSQL |
| `BETTER_AUTH_SECRET` | Genera con `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://tu-ip-ec2:3000` |
| `NEXT_PUBLIC_URL` | URL de tu frontend |

**Para el SSH_KEY**: 
```bash
cat tu-llave.pem
# Copia TODO desde -----BEGIN hasta -----END
```

---

## 🚀 Paso 4: Desplegar

### Primera vez (manual)

```bash
# En tu máquina local
export EC2_HOST=tu-ip-ec2
export EC2_USER=ubuntu
export SSH_KEY_PATH=./tu-llave.pem

./scripts/deploy-manual.sh
```

### Despliegues automáticos

Simplemente haz push a main:

```bash
git add .
git commit -m "feat: implementar nueva funcionalidad"
git push origin main
```

GitHub Actions automáticamente:
1. ✅ Construirá la imagen Docker
2. ✅ La subirá a Docker Hub
3. ✅ Se conectará a EC2
4. ✅ Desplegará la nueva versión
5. ✅ Verificará que funciona

---

## ✅ Paso 5: Verificar Despliegue

### Verificar Health Check

```bash
curl http://tu-ip-ec2:3000/health
```

Deberías ver:
```json
{
  "status": "healthy",
  "timestamp": "2024-12-11T...",
  "uptime": 123.45
}
```

### Ver logs en EC2

```bash
ssh -i tu-llave.pem ec2-user@tu-ip-ec2

# Logs de Docker
cd ~/app
docker compose logs -f

# Logs de systemd
sudo journalctl -u tandas-backend -f
```

### Verificar estado del servicio

```bash
# En EC2
sudo systemctl status tandas-backend
docker compose ps
```

---

## 🔍 Monitoreo Continuo

### GitHub Actions
Ve a tu repositorio → Actions tab

### Logs en tiempo real
```bash
ssh -i tu-llave.pem ubuntu@tu-ip-ec2 "cd ~/app && docker compose logs -f"
```

### Health Check
```bash
# Cada 30 segundos
watch -n 30 'curl -s http://tu-ip-ec2:3000/health | jq'
```

---

## 🆘 Problemas Comunes

### El contenedor no inicia

```bash
# Ver logs
ssh ubuntu@tu-ip-ec2
cd ~/app
docker compose logs

# Reiniciar
docker compose restart
```

### Health check falla

```bash
# Verificar que el puerto está abierto (Amazon Linux usa firewalld o iptables)
sudo firewall-cmd --list-all
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# Verificar que el contenedor está corriendo
docker compose ps
```

### GitHub Actions falla

1. Verifica que todos los secrets están configurados
2. Ve a Actions tab y revisa los logs
3. Verifica que el token de Docker Hub no haya expirado

### Necesito hacer rollback

```bash
# En EC2
cd ~/app
./rollback.sh <tag-anterior>

# Ejemplo
./rollback.sh main-abc1234
```

---

## 📱 Comandos Útiles

### En tu máquina local

```bash
# Despliegue manual (configurar variables primero)
export EC2_HOST=tu-ip-ec2
export EC2_USER=ec2-user
export SSH_KEY_PATH=./tu-llave.pem
./scripts/deploy-manual.sh

# Verificar build local
./scripts/verify-build.sh

# Ver logs remotos
ssh ec2-user@tu-ip-ec2 "cd ~/app && docker compose logs -f"
```

### En EC2

```bash
# Ver status
sudo systemctl status tandas-backend
docker compose ps

# Reiniciar
sudo systemctl restart tandas-backend

# Ver logs
docker compose logs -f

# Actualizar manualmente
cd ~/app
docker compose pull
docker compose up -d

# Limpiar imágenes antiguas
docker image prune -a
```

---

## 🎯 Checklist Final

- [ ] EC2 configurado con setup-server.sh
- [ ] Archivo .env creado en EC2
- [ ] systemd configurado
- [ ] Docker Hub configurado
- [ ] GitHub Secrets agregados (9 secrets)
- [ ] Primera deployment exitoso
- [ ] Health check funciona
- [ ] Logs visibles
- [ ] Puerto 3000 accesible

---

## 📚 Documentación Completa

Para más detalles, consulta:

- [README.md](README.md) - Documentación general
- [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md) - Guía completa de deployment
- [.github/LOCAL_TESTING.md](.github/LOCAL_TESTING.md) - Testing local
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Checklist de implementación

---

## 🎉 ¡Listo!

Una vez completados estos pasos:

- ✅ Tu aplicación está en producción
- ✅ Cada push a main despliega automáticamente
- ✅ El servidor se reinicia automáticamente si falla
- ✅ Los logs están disponibles
- ✅ Puedes hacer rollback si es necesario

**Tu aplicación está corriendo en**: `http://tu-ip-ec2:3000` 🚀

---

*Para soporte, revisa la sección de Troubleshooting en DEPLOYMENT.md*

