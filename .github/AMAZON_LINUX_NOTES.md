# 📝 Amazon Linux 2023 - Notas Importantes

Este proyecto ahora está configurado para **Amazon Linux 2023** en EC2.

## 🔑 Diferencias Clave con Ubuntu

| Aspecto | Ubuntu | Amazon Linux 2023 |
|---------|--------|-------------------|
| **Package Manager** | `apt-get` | `yum` |
| **Default User** | `ubuntu` | `ec2-user` |
| **Firewall** | `ufw` | `firewalld` o `iptables` |
| **Docker Install** | `docker-ce` package | `docker` package |
| **Docker Compose** | Plugin via apt | Manual install from GitHub |
| **Cron** | Pre-installed | Instalar `cronie` |

## ✅ Configuración Completada

Si ya ejecutaste estos comandos manualmente, el script `setup-server.sh` detectará las instalaciones existentes:

```bash
# Docker (ya instalado)
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Docker Compose (ya instalado)
sudo mkdir -p /usr/libexec/docker/cli-plugins/
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
```

## 📋 GitHub Secrets para Amazon Linux

Asegúrate de que tu secret `EC2_USER` en GitHub esté configurado como:

```
EC2_USER = ec2-user
```

**NO** uses `ubuntu` como en las distribuciones Ubuntu.

## 🔧 Comandos Útiles para Amazon Linux

### Gestión de Paquetes

```bash
# Actualizar sistema
sudo yum update -y

# Buscar paquete
sudo yum search package-name

# Instalar paquete
sudo yum install package-name -y

# Listar paquetes instalados
sudo yum list installed
```

### Firewall

```bash
# Ver estado de firewalld
sudo systemctl status firewalld

# Ver reglas activas
sudo firewall-cmd --list-all

# Agregar puerto
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
```

### Servicios

```bash
# Ver estado de un servicio
sudo systemctl status docker

# Habilitar auto-start
sudo systemctl enable docker

# Iniciar/detener/reiniciar
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker

# Ver logs
sudo journalctl -u docker -f
```

### Docker en Amazon Linux

```bash
# Verificar instalación
docker --version
docker compose version

# Ver containers
docker ps
docker compose ps

# Logs
docker logs container-name
docker compose logs -f
```

## 🚀 Deployment con Amazon Linux

El proceso de deployment es el mismo, solo considera:

1. **Usuario**: Usa `ec2-user` en lugar de `ubuntu`
2. **SSH**: Tu clave SSH funciona igual
3. **GitHub Actions**: Configurado para usar `EC2_USER` secret

### Ejemplo de Conexión SSH

```bash
# Conectar a EC2
ssh -i tu-llave.pem ec2-user@tu-ip-ec2

# Copiar archivos
scp -i tu-llave.pem archivo.txt ec2-user@tu-ip-ec2:~/

# Ejecutar comando remoto
ssh -i tu-llave.pem ec2-user@tu-ip-ec2 "docker compose ps"
```

## ⚠️ Troubleshooting Amazon Linux

### Docker no inicia

```bash
sudo systemctl start docker
sudo systemctl status docker
```

### Usuario no tiene permisos de Docker

```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker ec2-user

# IMPORTANTE: Desloguearse y volver a loguearse
exit
ssh -i tu-llave.pem ec2-user@tu-ip-ec2

# Verificar
docker ps
```

### Firewall bloqueando puertos

```bash
# Verificar si firewalld está activo
sudo systemctl status firewalld

# Si está activo, agregar puertos
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# Si no está activo, usar iptables
sudo iptables -I INPUT -p tcp --dport 3000 -j ACCEPT
```

### Docker Compose no encontrado

```bash
# Verificar instalación
docker compose version

# Si no está, reinstalar
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
```

## 📚 Recursos

- [Amazon Linux 2023 Documentation](https://docs.aws.amazon.com/linux/al2023/ug/what-is-amazon-linux.html)
- [Docker on Amazon Linux](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html)
- [Firewalld Guide](https://firewalld.org/documentation/)

---

**Nota**: Todos los scripts han sido actualizados para ser compatibles con Amazon Linux 2023. Si encuentras algún problema, revisa esta guía o consulta `DEPLOYMENT.md`.

