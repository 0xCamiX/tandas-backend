# 🔐 GitHub Secrets Setup Guide

## Configuración de Secrets en GitHub

Este documento te guía paso a paso para configurar todos los secrets necesarios en GitHub.

---

## 📍 Ubicación

Ve a tu repositorio en GitHub:

```
Tu Repositorio → Settings → Secrets and variables → Actions → New repository secret
```

O directamente: `https://github.com/TU_USUARIO/TU_REPO/settings/secrets/actions`

---

## 🔑 Secrets Requeridos (9 en total)

### 1. DOCKERHUB_USERNAME
**Descripción**: Tu nombre de usuario de Docker Hub  
**Cómo obtener**:
```bash
# Tu usuario de Docker Hub (ejemplo: johndoe)
```
**Ejemplo**: `johndoe`

---

### 2. DOCKERHUB_TOKEN
**Descripción**: Token de acceso de Docker Hub  
**Cómo obtener**:
1. Ve a https://hub.docker.com/
2. Inicia sesión
3. Account Settings → Security
4. "New Access Token"
5. Nombre: "GitHub Actions"
6. Permisos: Read, Write, Delete
7. Copia el token generado

**Formato**: `dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 3. EC2_HOST
**Descripción**: IP pública de tu instancia EC2  
**Cómo obtener**:
1. Ve a AWS Console → EC2 → Instances
2. Selecciona tu instancia
3. Copia "Public IPv4 address"

**Ejemplo**: `54.123.45.67`

---

### 4. EC2_USER
**Descripción**: Usuario SSH para conectarse a EC2  
**Valor común**:
- Ubuntu AMI: `ubuntu`
- Amazon Linux: `ec2-user`
- Debian: `admin`

**Ejemplo**: `ubuntu`

---

### 5. EC2_SSH_KEY
**Descripción**: Clave privada SSH completa para acceder a EC2  
**Cómo obtener**:
```bash
# En tu máquina local, muestra el contenido de tu clave
cat tu-archivo.pem

# O si está en otro formato
cat ~/.ssh/id_rsa
```

**IMPORTANTE**: 
- Copia TODO el contenido, incluyendo las líneas de BEGIN y END
- Debe incluir los saltos de línea
- No modifiques el formato

**Formato**:
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
... (muchas líneas) ...
... (muchas líneas) ...
-----END RSA PRIVATE KEY-----
```

---

### 6. DATABASE_URL
**Descripción**: URL de conexión a PostgreSQL  
**Formato**: `postgresql://usuario:contraseña@host:puerto/database`

**Para PostgreSQL externo**:
```
postgresql://yaku:mipassword@db.example.com:5432/tandas_prod?sslmode=require
```

**Para RDS**:
```
postgresql://usuario:password@mydb.xxxx.us-east-1.rds.amazonaws.com:5432/yaku?sslmode=require
```

**IMPORTANTE**:
- Usa caracteres especiales URL-encoded si tu contraseña los tiene
- Agrega `?sslmode=require` para conexiones seguras
- Verifica que el host sea accesible desde tu EC2

---

### 7. BETTER_AUTH_SECRET
**Descripción**: Clave secreta para Better Auth (autenticación)  
**Cómo generar**:
```bash
openssl rand -base64 32
```

**Ejemplo de salida**: `Xj8K9pQ2mN5vR7wT3yU6hL4gF1sD8aZ9cV0bN3mK5qP=`

**IMPORTANTE**: Genera una nueva, no uses un ejemplo

---

### 8. BETTER_AUTH_URL
**Descripción**: URL donde corre tu backend  
**Formato**: `http://tu-ip-ec2:3000` o `https://api.tudominio.com`

**Ejemplos**:
- Sin dominio: `http://54.123.45.67:3000`
- Con dominio: `https://api.yaku.com`

**IMPORTANTE**: Sin barra final `/`

---

### 9. NEXT_PUBLIC_URL
**Descripción**: URL de tu frontend (para CORS)  
**Formato**: `http://tu-frontend-url` o `https://app.tudominio.com`

**Ejemplos**:
- Desarrollo: `http://localhost:3001`
- Producción sin dominio: `http://54.123.45.68`
- Producción con dominio: `https://app.yaku.com`

**IMPORTANTE**: Sin barra final `/`

---

## ✅ Checklist de Verificación

Marca cada secret después de agregarlo:

- [ ] DOCKERHUB_USERNAME
- [ ] DOCKERHUB_TOKEN (empieza con `dckr_pat_`)
- [ ] EC2_HOST (formato IP: `x.x.x.x`)
- [ ] EC2_USER (normalmente `ubuntu`)
- [ ] EC2_SSH_KEY (incluye BEGIN y END)
- [ ] DATABASE_URL (empieza con `postgresql://`)
- [ ] BETTER_AUTH_SECRET (32+ caracteres aleatorios)
- [ ] BETTER_AUTH_URL (URL de tu backend)
- [ ] NEXT_PUBLIC_URL (URL de tu frontend)

---

## 🧪 Verificar Secrets

Después de agregar los secrets, puedes verificar que están configurados:

1. Ve a tu repositorio
2. Settings → Secrets and variables → Actions
3. Deberías ver 9 secrets listados

**NOTA**: No podrás ver los valores, solo los nombres.

---

## 🔒 Seguridad

### ✅ Buenas Prácticas

- ✅ Nunca compartas tus secrets
- ✅ Nunca los incluyas en código o commits
- ✅ Genera secrets únicos para producción
- ✅ Rota tus secrets periódicamente
- ✅ Usa contraseñas fuertes en DATABASE_URL

### ❌ Evitar

- ❌ No uses contraseñas simples
- ❌ No uses los valores de ejemplo
- ❌ No compartas el SSH_KEY
- ❌ No expongas secrets en logs

---

## 🚨 Troubleshooting

### Error: "Secret not found"
**Solución**: Verifica que el nombre del secret coincida exactamente (mayúsculas)

### Error: "Invalid SSH key"
**Solución**: Asegúrate de copiar TODO el contenido del .pem, incluyendo BEGIN/END

### Error: "Permission denied (publickey)"
**Solución**: Verifica que el EC2_SSH_KEY corresponde a la key pair de tu EC2

### Error: "Failed to connect to database"
**Solución**: Verifica el DATABASE_URL y que EC2 puede acceder a la base de datos

### Error: "Failed to push to Docker Hub"
**Solución**: Verifica que el DOCKERHUB_TOKEN no haya expirado

---

## 🔄 Rotar Secrets

Si necesitas cambiar un secret:

1. Ve a Settings → Secrets and variables → Actions
2. Click en el secret que quieres cambiar
3. "Update secret"
4. Ingresa el nuevo valor
5. "Update secret"

---

## 📝 Template de Notas

Guarda esta información de forma segura (1Password, LastPass, etc):

```yaml
# YAKU Backend - Production Secrets
# Fecha: 2024-XX-XX

DOCKERHUB_USERNAME: "tu-usuario"
DOCKERHUB_TOKEN: "dckr_pat_xxxxx" # Expira: nunca / 2025-XX-XX

EC2_HOST: "54.xxx.xxx.xxx"
EC2_USER: "ubuntu"
EC2_SSH_KEY: "Archivo: ~/Downloads/yaku-key.pem"

DATABASE_URL: "postgresql://usuario@host:5432/db"
BETTER_AUTH_SECRET: "xxxxx" # Generado: 2024-XX-XX
BETTER_AUTH_URL: "http://54.xxx.xxx.xxx:3000"
NEXT_PUBLIC_URL: "http://tu-frontend"
```

---

## ✅ Todo Listo

Una vez configurados todos los secrets:

1. Haz un push a `main`:
```bash
git push origin main
```

2. Ve a Actions tab y observa el workflow ejecutarse

3. Si todo está bien configurado:
   - ✅ Build and Push completará exitosamente
   - ✅ Deploy to EC2 desplegará tu aplicación
   - ✅ Podrás acceder a `http://tu-ip-ec2:3000/health`

---

## 📚 Más Información

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [DEPLOYMENT.md](.github/DEPLOYMENT.md) - Guía completa de deployment
- [QUICK_START.md](../QUICK_START.md) - Inicio rápido

---

*Mantén tus secrets seguros y nunca los compartas públicamente* 🔒

