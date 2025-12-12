# 🚀 TANDAS Backend - Deployment Guide

Complete guide for deploying the TANDAS Backend API to AWS EC2 with Docker and GitHub Actions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial EC2 Setup](#initial-ec2-setup)
3. [GitHub Configuration](#github-configuration)
4. [Docker Hub Setup](#docker-hub-setup)
5. [First Deployment](#first-deployment)
6. [Automated Deployments](#automated-deployments)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Local Requirements
- Docker and Docker Compose installed
- Bun runtime installed
- SSH access configured
- Git repository access

### AWS Requirements
- EC2 instance running Ubuntu 20.04+ or Amazon Linux 2
- Instance type: t2.micro or better (t2.small recommended)
- Security group configured:
  - Port 22 (SSH)
  - Port 80 (HTTP)
  - Port 443 (HTTPS - for future)
  - Port 3000 (API)
- Elastic IP assigned (recommended)

### External Services
- PostgreSQL database (external)
- Docker Hub account
- GitHub repository with Actions enabled

---

## Initial EC2 Setup

### 1. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 2. Copy Setup Scripts

From your local machine:

```bash
# Copy the setup script
scp -i your-key.pem scripts/ec2/setup-server.sh ubuntu@your-ec2-ip:~/

# Connect and run
ssh -i your-key.pem ubuntu@your-ec2-ip
chmod +x setup-server.sh
./setup-server.sh
```

### 3. Log Out and Back In

After setup completes, log out and back in for Docker group changes to take effect:

```bash
exit
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 4. Verify Installation

```bash
docker --version
docker compose version
bun --version
```

### 5. Create Environment File

Create `~/app/.env` with your production values:

```bash
nano ~/app/.env
```

Use `.env.example.production` as a template. **Important**: Use strong, randomly generated secrets!

```bash
# Generate secrets:
openssl rand -base64 32
```

### 6. Setup Auto-Start with systemd

```bash
cd ~
wget https://raw.githubusercontent.com/YOUR_REPO/main/scripts/ec2/setup-systemd.sh
chmod +x setup-systemd.sh
./setup-systemd.sh
```

### 7. (Optional) Install Watchtower for Auto-Updates

```bash
cd ~
wget https://raw.githubusercontent.com/YOUR_REPO/main/scripts/ec2/install-watchtower.sh
chmod +x install-watchtower.sh
./install-watchtower.sh
```

---

## GitHub Configuration

### Required Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | `johndoe` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_...` |
| `EC2_HOST` | EC2 public IP or domain | `54.123.45.67` |
| `EC2_USER` | SSH user (usually `ubuntu`) | `ubuntu` |
| `EC2_SSH_KEY` | Private SSH key (entire file) | `-----BEGIN RSA...` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `BETTER_AUTH_SECRET` | Auth secret key | `generated-secret` |
| `BETTER_AUTH_URL` | Backend URL | `http://your-ec2-ip:3000` |
| `NEXT_PUBLIC_URL` | Frontend URL | `http://your-frontend-url` |

### Getting Docker Hub Token

1. Log in to Docker Hub
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Name it "GitHub Actions" and copy the token

### Preparing SSH Key

```bash
cat your-key.pem
# Copy the entire output including BEGIN and END lines
```

Paste into GitHub Secrets as `EC2_SSH_KEY`.

---

## Docker Hub Setup

### Create Repository

1. Log in to Docker Hub
2. Click "Create Repository"
3. Name: `tandas-backend`
4. Visibility: Private (recommended) or Public
5. Create

Your image will be: `your-username/tandas-backend`

---

## First Deployment

### Option 1: Automated (via GitHub Actions)

1. Ensure all secrets are configured in GitHub
2. Push to main branch:

```bash
git add .
git commit -m "feat: setup deployment infrastructure"
git push origin main
```

3. Go to GitHub → Actions tab
4. Watch the workflows:
   - "Build and Push Docker Image"
   - "Deploy to EC2"

### Option 2: Manual Deployment

If GitHub Actions is not ready yet:

```bash
# Set environment variables
export EC2_HOST=your-ec2-ip
export EC2_USER=ubuntu
export SSH_KEY_PATH=/path/to/your-key.pem

# Run manual deployment
chmod +x scripts/deploy-manual.sh
./scripts/deploy-manual.sh
```

### Verify Deployment

```bash
# Check health endpoint
curl http://your-ec2-ip:3000/health

# Should return:
# {"status":"healthy","timestamp":"...","uptime":...}
```

---

## Automated Deployments

Once setup is complete, deployments are fully automated:

1. **Developer pushes to `main`** → Triggers build workflow
2. **Build workflow** → Builds Docker image, runs tests, pushes to Docker Hub
3. **Deploy workflow** → Automatically triggered after successful build
4. **EC2 deployment** → Pulls new image, deploys, health checks

### Monitoring Deployments

- **GitHub Actions**: Repository → Actions tab
- **EC2 Logs**: `ssh ubuntu@your-ec2-ip "cd ~/app && docker compose logs -f"`
- **Systemd**: `ssh ubuntu@your-ec2-ip "sudo journalctl -u tandas-backend -f"`

---

## Monitoring & Maintenance

### Checking Service Status

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Check systemd service
sudo systemctl status tandas-backend

# Check Docker containers
docker compose ps

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f server
```

### Health Monitoring

```bash
# Local health check
curl http://localhost:3000/health

# Remote health check
curl http://your-ec2-ip:3000/health
```

### Resource Usage

```bash
# Check Docker resource usage
docker stats

# Check system resources
htop

# Check disk space
df -h

# Check Docker disk usage
docker system df
```

### Cleaning Up

```bash
# Remove old images
docker image prune -a

# Remove old containers
docker container prune

# Remove everything unused
docker system prune -a --volumes
```

---

## Rollback

If a deployment fails or introduces issues:

### Automatic Rollback

The deployment script automatically rolls back if health checks fail.

### Manual Rollback

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# List available image tags
docker images | grep tandas-backend

# Rollback to specific version
cd ~/app
export IMAGE_TAG=main-abc1234  # Replace with desired tag
docker compose pull
docker compose up -d

# Or use the rollback script
chmod +x rollback.sh
./rollback.sh main-abc1234
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose logs

# Check if port is in use
sudo lsof -i :3000

# Restart everything
docker compose down
docker compose up -d
```

### Health Check Fails

```bash
# Check if app is running
docker compose ps

# Check app logs
docker compose logs server

# Test database connection
docker compose exec server bun run -e "console.log('DB:', process.env.DATABASE_URL)"
```

### GitHub Actions Fails

- **Build fails**: Check `build-and-push.yml` workflow logs
- **Deploy fails**: Check `deploy.yml` workflow logs
- **SSH fails**: Verify `EC2_SSH_KEY` secret is correct
- **Docker pull fails**: Verify `DOCKERHUB_TOKEN` is valid

### Connection Issues

```bash
# Check security group allows port 3000
# Check firewall on EC2
sudo ufw status

# Check if service is listening
sudo netstat -tlnp | grep 3000
```

### Database Connection Issues

```bash
# Test database connection
docker compose exec server bun run -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect().then(() => console.log('Connected!')).catch(e => console.error(e));
"
```

### Out of Memory

```bash
# Check memory usage
free -h

# Restart container with more memory
# Edit docker-compose.yml and increase memory limits
docker compose down
docker compose up -d
```

### Disk Full

```bash
# Check disk usage
df -h

# Clean Docker resources
docker system prune -a --volumes

# Check logs size
du -sh ~/app/logs/*
```

---

## Useful Commands

### Docker Commands

```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f

# Restart service
docker compose restart

# Stop all services
docker compose down

# Start all services
docker compose up -d

# Rebuild and restart
docker compose up -d --build

# Execute command in container
docker compose exec server bash
```

### Systemd Commands

```bash
# Check status
sudo systemctl status tandas-backend

# Start service
sudo systemctl start tandas-backend

# Stop service
sudo systemctl stop tandas-backend

# Restart service
sudo systemctl restart tandas-backend

# View logs
sudo journalctl -u tandas-backend -f

# View recent logs
sudo journalctl -u tandas-backend -n 100
```

### Monitoring Commands

```bash
# Real-time resource usage
docker stats

# Container inspect
docker compose exec server env

# Network inspect
docker network inspect tandas-network

# Volume inspect
docker volume ls
```

---

## Security Best Practices

1. **Use strong secrets**: Generate with `openssl rand -base64 32`
2. **Keep secrets out of Git**: Never commit `.env` files
3. **Use HTTPS in production**: Configure SSL with Caddy or Let's Encrypt
4. **Regular updates**: Keep Docker, packages, and dependencies updated
5. **Monitor logs**: Regularly check for suspicious activity
6. **Backup database**: Regular automated backups of PostgreSQL
7. **Firewall rules**: Only open necessary ports
8. **SSH keys**: Use key-based authentication, disable password auth

---

## Performance Optimization

1. **Resource limits**: Adjust in `docker-compose.prod.yml`
2. **Caching**: Enable Redis for session storage (future enhancement)
3. **CDN**: Use CloudFront for static assets (future enhancement)
4. **Database**: Use connection pooling, indexes
5. **Monitoring**: Setup CloudWatch or DataDog (future enhancement)

---

## Support

- **Documentation**: Check README.md and this file
- **Logs**: Always check logs first
- **Issues**: Create GitHub issue with logs and steps to reproduce

---

## Next Steps

- [ ] Configure domain name and HTTPS with Caddy
- [ ] Setup monitoring with CloudWatch
- [ ] Configure automated backups
- [ ] Setup staging environment
- [ ] Add load balancing for multiple instances
- [ ] Configure CDN for static assets

