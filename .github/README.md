# 📚 TANDAS Backend - DevOps Documentation

Este directorio contiene toda la documentación y configuración para el deployment del backend de TANDAS.

---

## 📖 Guías Disponibles

### 🔐 [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)
**Configuración de Secrets en GitHub**

Guía paso a paso para configurar los 9 secrets necesarios en GitHub Actions.

**Contenido**:
- ✅ Lista de secrets requeridos
- ✅ Cómo obtener cada valor
- ✅ Ejemplos y formatos
- ✅ Troubleshooting de secrets

**Tiempo estimado**: 15-20 minutos

---

### 📦 [DEPLOYMENT.md](DEPLOYMENT.md)
**Guía Completa de Deployment**

Documentación exhaustiva de todo el proceso de deployment (250+ líneas).

**Contenido**:
- ✅ Prerequisites completos
- ✅ Setup inicial de EC2
- ✅ Configuración de GitHub Actions
- ✅ Configuración de Docker Hub
- ✅ Procedimientos de deployment
- ✅ Monitoreo y mantenimiento
- ✅ Rollback procedures
- ✅ Troubleshooting extensivo

**Tiempo estimado**: 1-2 horas de lectura y setup

---

### 🧪 [LOCAL_TESTING.md](LOCAL_TESTING.md)
**Testing y Verificación Local**

Guía para verificar que todo funciona antes de desplegar.

**Contenido**:
- ✅ Pre-deployment checklist
- ✅ Verificaciones de Docker
- ✅ Testing de API
- ✅ Performance testing
- ✅ Deployment readiness score

**Tiempo estimado**: 30 minutos

---


## 🔄 Flujo de Lectura Recomendado

### Para Deployment Rápido

1. **[GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)** → Configure secrets
2. **[DEPLOYMENT.md](DEPLOYMENT.md)** → Follow deployment guide
3. **Deploy** → `git push origin main`

**Time**: ~1 hour

---

### Para Entender el Sistema Completo

1. **[DEPLOYMENT.md](DEPLOYMENT.md)** → Complete guide
2. **[LOCAL_TESTING.md](LOCAL_TESTING.md)** → Verification
3. **[GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)** → Secrets setup

**Time**: 2-3 hours

---

## 🛠 Workflows de GitHub Actions

### [build-and-push.yml](workflows/build-and-push.yml)
**CI Pipeline - Build & Push**

Ejecutado en cada push a `main` o `develop`:
1. Checkout código
2. Setup Bun
3. Install dependencies
4. Run linter
5. Build Docker image
6. Push to Docker Hub

**Triggers**: Push to `main` or `develop`

---

### [deploy.yml](workflows/deploy.yml)
**CD Pipeline - Deploy to EC2**

Ejecutado después de build exitoso:
1. Connect to EC2 via SSH
2. Copy files (docker-compose, env, scripts)
3. Deploy application
4. Verify health check
5. Rollback if fails

**Triggers**: Workflow `build-and-push.yml` completes successfully

---

### [ci.yml](workflows/ci.yml)
**Continuous Integration**

Workflow original de CI (mantenerlo o integrarlo según necesites).

---

## 📂 Estructura de Archivos

```
.github/
├── README.md                      (Este archivo)
├── DEPLOYMENT.md                  (Guía completa)
├── LOCAL_TESTING.md               (Testing local)
├── GITHUB_SECRETS_SETUP.md        (Configuración secrets)
└── workflows/
    ├── build-and-push.yml         (CI: Build & Push)
    ├── deploy.yml                 (CD: Deploy)
    └── ci.yml                     (Original CI)

Raíz del proyecto:
├── README.md                      (Main documentation)
├── docker-compose.yml             (Local development)
├── docker-compose.prod.yml        (Production)
├── Dockerfile
├── nginx/                         (Nginx reverse proxy config)
└── scripts/
    ├── verify-build.sh
    ├── deploy-manual.sh
    ├── rollback.sh
    └── ec2/
        ├── setup-server.sh
        ├── deploy.sh
        ├── install-watchtower.sh
        └── setup-systemd.sh
```

---

## 🎯 Uso por Situación

### "Necesito configurar los secrets de GitHub"
→ **[GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)**

### "Quiero entender todo el sistema"
→ **[DEPLOYMENT.md](DEPLOYMENT.md)**

### "¿Cómo verifico que funciona localmente?"
→ **[LOCAL_TESTING.md](LOCAL_TESTING.md)**

### "Algo salió mal, necesito ayuda"
→ **[DEPLOYMENT.md](DEPLOYMENT.md)** → Sección "Troubleshooting"

---

## 🔗 Enlaces Útiles

### Documentación del Proyecto
- [README Principal](../README.md)
- [Prisma Schema](../prisma/schema.prisma)
- [Package.json](../package.json)

### External Resources
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Docs](https://docs.docker.com/)
- [Bun Docs](https://bun.sh/docs)
- [AWS EC2 Docs](https://docs.aws.amazon.com/ec2/)

---

## 📞 Soporte

### Problemas Comunes
1. Revisa la sección de Troubleshooting en [DEPLOYMENT.md](DEPLOYMENT.md)
2. Verifica los logs: [LOCAL_TESTING.md](LOCAL_TESTING.md#checking-logs)
3. Consulta [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md#troubleshooting)

### Crear un Issue
Si encuentras un problema:
1. Revisa la documentación primero
2. Busca en Issues existentes
3. Crea un nuevo Issue con:
   - Descripción del problema
   - Pasos para reproducir
   - Logs relevantes
   - Ambiente (local/EC2)

---

## ✅ Status

**Última actualización**: Diciembre 2025  
**Versión de documentación**: 1.0  
**Estado**: ✅ Completo y listo para producción

---

**¿Preguntas?** Revisa la documentación correspondiente según tu necesidad. Toda la información necesaria está documentada en estos archivos. 📚

