# EC2 Setup — YAKU Backend

Step-by-step guide to provision and configure an AWS EC2 instance to run the YAKU Backend in production using Docker, Nginx, and systemd.

---

## Prerequisites

**Local machine:**
- SSH key pair `.pem` file (RSA)
- Bun runtime installed
- `yaku-backend/` project directory

**AWS account with:**
- EC2 access
- Elastic IP (recommended for stable IP)

---

## Step 1 — Launch EC2 Instance

In the AWS Console go to **EC2 → Launch Instance** and configure:

| Field | Value |
|-------|-------|
| Name | `yaku-backend` |
| AMI | Amazon Linux 2023 AMI |
| Architecture | 64-bit (Arm) |
| Instance type | `t4g.small` (2 vCPU, 2 GB RAM) |
| Key pair | RSA `.pem` key (e.g. `tandas-backend-rsa`) |
| Storage | 20 GB gp3 |

---

## Step 2 — Security Group

Create a Security Group named `yaku-backend-sg` with these inbound rules:

| Type | Protocol | Port | Source |
|------|----------|------|--------|
| SSH | TCP | 22 | My IP |
| HTTP | TCP | 80 | 0.0.0.0/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0 |
| Custom TCP | TCP | 3000 | 0.0.0.0/0 |

> Port 3000 is optional if traffic flows exclusively through nginx on port 80.

---

## Step 3 — Elastic IP

To prevent the IP from changing on instance restarts:

1. Go to **EC2 → Elastic IPs → Allocate Elastic IP**
2. **Associate Elastic IP** → select your instance

---

## Step 4 — Set Local Environment Variables

Run these exports in the terminal you will use for all SCP and SSH commands. The `.pem` file lives at the root of the YAKU workspace.

```bash
export EC2_HOST=ec2-18-190-201-182.us-east-2.compute.amazonaws.com
export EC2_USER=ec2-user
export SSH_KEY_PATH=/Users/0xcamix/dev/academico/YAKU/tandas-backend-rsa.pem
```

> You can use the DNS hostname or the public IP interchangeably in `EC2_HOST`.

---

## Step 5 — First SSH Connection

```bash
chmod 600 "$SSH_KEY_PATH"
ssh -i "$SSH_KEY_PATH" ec2-user@$EC2_HOST
```

---

## Step 6 — Send Setup Scripts to EC2

From `yaku-backend/`:

```bash
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "mkdir -p ~/setup"

scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    scripts/ec2/setup-server.sh \
    scripts/ec2/setup-systemd.sh \
    scripts/ec2/install-watchtower.sh \
    scripts/ec2/deploy.sh \
    "$EC2_USER@$EC2_HOST:~/setup/"
```

---

## Step 7 — Run Server Setup

Connect to the EC2 and run the base setup script:

```bash
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "chmod +x ~/setup/*.sh && ~/setup/setup-server.sh"
```

`setup-server.sh` installs:
- Docker + Docker Compose V2
- Bun runtime
- Basic utilities (`wget`, `git`, `vim`, `htop`, `jq`)
- 2 GB swap file
- Log rotation for `~/app/logs/`
- System limits (`nofile`, `nproc`)
- Application directories: `~/app`, `~/app/logs`, `~/app/nginx/conf.d`

**After it finishes, disconnect and reconnect** for Docker group changes to take effect:

```bash
exit
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST"
```

Verify the installation:

```bash
docker --version
docker compose version
bun --version
```

---

## Step 8 — Copy Application Files

From `yaku-backend/`, copy all required files to the EC2:

```bash
# Create remote directories
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "mkdir -p ~/app/logs ~/app/nginx/conf.d"

# docker-compose
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    docker-compose.prod.yml "$EC2_USER@$EC2_HOST:~/app/docker-compose.yml"

# environment variables
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    .env.prod "$EC2_USER@$EC2_HOST:~/app/.env"

# deploy script
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    scripts/ec2/deploy.sh "$EC2_USER@$EC2_HOST:~/app/deploy.sh"

# nginx configuration
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    nginx/nginx.conf "$EC2_USER@$EC2_HOST:~/app/nginx/nginx.conf"

scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no \
    nginx/conf.d/default.conf "$EC2_USER@$EC2_HOST:~/app/nginx/conf.d/default.conf"
```

Verify the remote file tree:

```bash
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "find ~/app -type f"
```

Expected output:

```
/home/ec2-user/app/docker-compose.yml
/home/ec2-user/app/.env
/home/ec2-user/app/deploy.sh
/home/ec2-user/app/nginx/nginx.conf
/home/ec2-user/app/nginx/conf.d/default.conf
```

---

## Step 9 — Configure systemd Auto-Start

```bash
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "~/setup/setup-systemd.sh"
```

This creates a systemd service `yaku-backend.service` that:
- Starts automatically on boot
- Restarts on failure with 10 s backoff
- Runs `docker compose up -d` from `~/app`

---

## Step 10 — Install Watchtower (Auto-Updates)

```bash
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "~/setup/install-watchtower.sh"
```

Watchtower polls Docker Hub every 5 minutes and automatically redeploys containers when a new image is pushed.

---

## Step 11 — First Deploy

```bash
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" \
    "cd ~/app && chmod +x deploy.sh && ./deploy.sh"
```

`deploy.sh` will:
1. Pull the latest image from Docker Hub
2. Stop existing containers
3. Start new containers with `docker compose up -d`
4. Run a health check against `http://localhost/health` (up to 15 retries)
5. Clean up old images older than 24 h

---

## Step 12 — Seed the Database

The seed script connects directly to Prisma Accelerate (cloud database). Run it locally — no EC2 access needed:

```bash
# From yaku-backend/
bun --env-file=.env.prod run db:seed
```

> The seed is idempotent: existing courses are updated, not duplicated.

---

## Verification

```bash
# Health check via nginx (port 80)
curl http://$EC2_HOST/health

# View container logs
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_HOST" \
    'cd ~/app && docker compose logs -f'

# Container status
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_HOST" \
    'cd ~/app && docker compose ps'

# systemd service status
ssh -i "$SSH_KEY_PATH" "$EC2_USER@$EC2_HOST" \
    'sudo systemctl status yaku-backend'
```

---

## Useful Commands on the EC2

```bash
# Docker
docker compose ps
docker compose logs -f
docker compose restart
docker compose down
docker compose up -d
docker stats
docker system df

# systemd
sudo systemctl status yaku-backend
sudo systemctl restart yaku-backend
sudo systemctl stop yaku-backend
sudo journalctl -u yaku-backend -f
sudo journalctl -u yaku-backend -n 100

# Disk and memory
df -h
free -h
docker system prune -af --filter "until=24h"
```

---

## Manual Re-Deploy (without GitHub Actions)

If you need to push a new version manually:

```bash
export EC2_HOST=ec2-18-190-201-182.us-east-2.compute.amazonaws.com
export EC2_USER=ec2-user
export SSH_KEY_PATH=/Users/0xcamix/dev/academico/YAKU/tandas-backend-rsa.pem

cd /Users/0xcamix/dev/academico/YAKU/yaku-backend
bash scripts/deploy-manual.sh
```

`deploy-manual.sh` copies all files and runs `deploy.sh` remotely in a single command.

---

## EC2 Instance Reference

| Parameter | Value |
|-----------|-------|
| Host | `ec2-18-190-201-182.us-east-2.compute.amazonaws.com` |
| User | `ec2-user` |
| Region | `us-east-2` |
| OS | Amazon Linux 2023 |
| Architecture | ARM64 |
| App directory | `~/app` |
| Setup scripts | `~/setup/` |
| Logs | `~/app/logs/` |
