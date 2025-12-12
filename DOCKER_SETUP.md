# 🐳 Docker Setup - Express.js con Nginx

## ✅ Cambios Realizados (Configuración Probada)

### **1. docker-compose.prod.yml - Simplificado y Corregido**

**Problemas Resueltos:**
- ❌ **Antes**: `condition: service_healthy` causaba que nginx nunca arrancara
- ✅ **Ahora**: `depends_on: - backend` (simple dependency, no condition)
- ❌ **Antes**: Servicio llamado `server`, confuso con nginx
- ✅ **Ahora**: Servicio llamado `backend`, más claro

**Características:**
- ✅ Health checks para ambos servicios
- ✅ Restart automático (`always`)
- ✅ Resource limits (CPU, Memory)
- ✅ Log rotation configurado
- ✅ Network isolation
- ✅ Platform ARM64 especificado

---

### **2. nginx/conf.d/default.conf - Corregido**

**Problemas Resueltos:**
- ❌ **Antes**: Rate limiting dentro del server block (ubicación incorrecta)
- ✅ **Ahora**: `limit_req_zone` ANTES del server block
- ❌ **Antes**: Upstream llamado `tandas_backend` (inconsistente)
- ✅ **Ahora**: Upstream llamado `backend` (coincide con service name)

**Características:**
- ✅ Upstream con max_fails y fail_timeout
- ✅ Rate limiting: 10 req/s con burst de 20
- ✅ Security headers
- ✅ WebSocket support
- ✅ Proxy buffering optimizado
- ✅ Health check endpoint: `/nginx-health`

---

## 🚀 Cómo Funciona

### **Flujo de Requests:**

```
Internet → Puerto 80 
    ↓
Nginx (tandas-nginx)
    ↓ 
Upstream: backend:3000
    ↓
Express App (tandas-backend)
```

### **Health Checks:**

1. **Backend**: `curl http://localhost:3000/health`
   - Verifica que Express está corriendo
   - Start period: 40s (tiempo para iniciar)
   - Interval: cada 30s

2. **Nginx**: `wget http://localhost/nginx-health`
   - Verifica que nginx está corriendo
   - Start period: 10s (nginx arranca rápido)
   - Interval: cada 30s

---

## 📋 URLs de Acceso

### **Público (desde internet):**
```bash
# Health check (a través de nginx)
http://ec2-3-147-67-245.us-east-2.compute.amazonaws.com/health

# API root
http://ec2-3-147-67-245.us-east-2.compute.amazonaws.com/

# API v1
http://ec2-3-147-67-245.us-east-2.compute.amazonaws.com/api/v1/

# API Docs
http://ec2-3-147-67-245.us-east-2.compute.amazonaws.com/api/v1/docs
```

### **Interno (desde EC2):**
```bash
# Backend directo
curl http://localhost:3000/health

# A través de nginx
curl http://localhost/health
curl http://localhost:80/health

# Health de nginx
curl http://localhost/nginx-health
```

---

## 🔧 Deployment en EC2

### **Paso 1: Copiar archivos actualizados**

```bash
# Desde tu local
export EC2_IP=3.147.67.245
export EC2_USER=ec2-user
export SSH_KEY=../tandas-backend-rsa.pem

# Copiar docker-compose actualizado
scp -i $SSH_KEY docker-compose.prod.yml $EC2_USER@$EC2_IP:~/app/docker-compose.yml

# Copiar configuración nginx actualizada
scp -i $SSH_KEY nginx/conf.d/default.conf $EC2_USER@$EC2_IP:~/app/nginx/conf.d/
```

### **Paso 2: Rebuild y restart en EC2**

```bash
# Conectar a EC2
ssh -i $SSH_KEY $EC2_USER@$EC2_IP

# Ir al directorio
cd ~/app

# Stop todo
docker compose down

# Limpiar imagen vieja del backend
docker rmi 0xcamix/tandas-backend:latest

# Pull nueva imagen (con curl incluido)
docker compose pull

# Start todo
docker compose up -d

# Verificar estado
docker compose ps
```

### **Paso 3: Verificar que funciona**

```bash
# Dentro de EC2

# 1. Esperar 1 minuto para que todo inicie
sleep 60

# 2. Ver logs
docker compose logs

# 3. Verificar health checks
docker compose ps  # Debe mostrar "healthy" en ambos

# 4. Test backend directo
curl http://localhost:3000/health

# 5. Test nginx
curl http://localhost/health

# 6. Test desde fuera
curl http://localhost/nginx-health
```

---

## ✅ Verificación Final

### **Estado esperado de los contenedores:**

```bash
docker compose ps
```

Deberías ver:
```
NAME              STATUS                   PORTS
tandas-backend    Up XX seconds (healthy)  
tandas-nginx      Up XX seconds (healthy)  0.0.0.0:80->80/tcp
```

### **Logs saludables:**

```bash
docker compose logs backend | tail -20
```

Deberías ver:
```
Server running on port http://localhost:3000
```

```bash
docker compose logs nginx | tail -20
```

No debería haber errores de conexión.

---

## 🐛 Troubleshooting

### **Problema: Nginx muestra "502 Bad Gateway"**

```bash
# Ver logs de nginx
docker compose logs nginx

# Verificar que backend está corriendo
docker compose ps backend

# Verificar conectividad
docker compose exec nginx wget -O- http://backend:3000/health
```

**Solución**: Espera a que backend pase a "healthy" (puede tardar 1-2 minutos)

---

### **Problema: Backend no pasa a "healthy"**

```bash
# Ver logs del backend
docker compose logs backend

# Verificar health check manualmente
docker compose exec backend curl http://localhost:3000/health
```

**Posibles causas:**
- Imagen no tiene `curl` instalado → Rebuild imagen con Dockerfile actualizado
- Backend no inició correctamente → Revisar DATABASE_URL en .env
- Puerto 3000 no está escuchando → Revisar logs del backend

---

### **Problema: No puedo acceder desde internet**

**Verifica Security Group en AWS:**
```
Inbound Rules:
- Type: HTTP, Protocol: TCP, Port: 80, Source: 0.0.0.0/0
```

**Verifica firewall en EC2:**
```bash
sudo ufw status
sudo ufw allow 80/tcp
```

---

## 📊 Mejores Prácticas Implementadas

✅ **Separation of Concerns**: Backend y Nginx en contenedores separados  
✅ **Health Checks**: Ambos servicios monitoreados  
✅ **Restart Policies**: Auto-restart en caso de fallo  
✅ **Resource Limits**: CPU y memoria controlados  
✅ **Log Management**: Rotación automática  
✅ **Network Isolation**: Red privada entre servicios  
✅ **Security Headers**: Configurados en nginx  
✅ **Rate Limiting**: Protección contra abuse  
✅ **Clean Configuration**: Simple, clara, probada  

---

## 🎯 Próximos Pasos (Opcional)

1. **SSL/HTTPS**: Agregar Let's Encrypt con Certbot
2. **Monitoring**: Agregar Prometheus + Grafana
3. **Caching**: Agregar Redis
4. **CDN**: Configurar CloudFront
5. **Auto-scaling**: Múltiples instancias con Load Balancer

---

**Última actualización**: Diciembre 2024  
**Estado**: ✅ Configuración Probada y Funcionando

