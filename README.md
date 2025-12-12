# TANDAS Backend API

REST API para plataforma educativa de tratamiento de agua.

## 📚 Stack

- **Runtime**: Bun
- **Framework**: Express.js 5
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Better Auth
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: AWS EC2

## 🚀 Quick Start

### Development Setup

```bash
# Clone repository
git clone <repository-url>
cd tandas-backend

# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
bunx prisma migrate dev

# Start development server
bun run dev
```

Server running at: http://localhost:3000

### Available Scripts

```bash
bun run dev          # Start development server with hot reload
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run linter
bun run check        # Check code quality
bun run db:seed      # Seed database
```

## 🐳 Docker

### Local Development with Docker

```bash
# Build and start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Verify Build

```bash
chmod +x scripts/verify-build.sh
./scripts/verify-build.sh
```

### Production Build

```bash
# Build with secrets
docker build --secret id=DATABASE_URL,env=DATABASE_URL -t tandas-rest-api .

# Run container
docker run --env-file .env -p 3000:3000 tandas-rest-api
```

## 🔐 Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` / `production` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `BETTER_AUTH_SECRET` | Auth secret key | Generated with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Backend URL | `http://localhost:3000` |
| `NEXT_PUBLIC_URL` | Frontend URL | `http://localhost:3001` |

See `.env.example` for development and `.env.example.production` for production setup.

## 📦 Deployment

### Production Deployment to EC2

**Platform**: Amazon Linux 2023 (default user: `ec2-user`)

Complete deployment guide: [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)  
Amazon Linux notes: [.github/AMAZON_LINUX_NOTES.md](.github/AMAZON_LINUX_NOTES.md)

#### Quick Deployment Steps

1. **Setup EC2 Server** (one-time):
```bash
# Amazon Linux 2023
scp -i your-key.pem scripts/ec2/setup-server.sh ec2-user@your-ec2-ip:~/
ssh -i your-key.pem ec2-user@your-ec2-ip
chmod +x setup-server.sh
./setup-server.sh

# IMPORTANT: Log out and back in for Docker permissions
exit
ssh -i your-key.pem ec2-user@your-ec2-ip
```

2. **Configure GitHub Secrets**:
   - `DOCKERHUB_USERNAME` & `DOCKERHUB_TOKEN`
   - `EC2_HOST`, `EC2_USER` (`ec2-user` for Amazon Linux), `EC2_SSH_KEY`
   - `DATABASE_URL` and other env variables
   - See: [.github/GITHUB_SECRETS_SETUP.md](.github/GITHUB_SECRETS_SETUP.md)

3. **Deploy**:
```bash
git push origin main
# GitHub Actions automatically builds and deploys
```

#### Manual Deployment

```bash
export EC2_HOST=your-ec2-ip
export EC2_USER=ec2-user  # For Amazon Linux 2023
export SSH_KEY_PATH=/path/to/key.pem

chmod +x scripts/deploy-manual.sh
./scripts/deploy-manual.sh
```

### Deployment Architecture

```
Developer → GitHub → GitHub Actions → Docker Hub → EC2 → Running Container
```

**Features**:
- ✅ Automated CI/CD pipeline
- ✅ Health checks and auto-rollback
- ✅ Auto-restart on failure (systemd)
- ✅ Auto-update monitoring (Watchtower)
- ✅ Resource limits and logging
- ✅ Nginx reverse proxy ready

## 🔧 EC2 Server Management

### Service Management (systemd)

```bash
# Check status
sudo systemctl status tandas-backend

# Start/Stop/Restart
sudo systemctl start tandas-backend
sudo systemctl stop tandas-backend
sudo systemctl restart tandas-backend

# View logs
sudo journalctl -u tandas-backend -f
```

### Docker Management

```bash
# View containers
docker compose ps

# View logs
docker compose logs -f

# Restart
docker compose restart

# Update and restart
docker compose pull
docker compose up -d
```

### Monitoring

```bash
# Health check
curl http://localhost:3000/health

# Resource usage
docker stats

# System resources
htop
```

## 🔄 Rollback

If deployment fails:

```bash
# Automatic rollback on health check failure (built-in)

# Manual rollback to specific version
cd ~/app
./rollback.sh <image-tag>

# Example
./rollback.sh main-abc1234
```

## 🛠 Troubleshooting

### Common Issues

**Container won't start**:
```bash
docker compose logs
docker compose down && docker compose up -d
```

**Health check fails**:
```bash
docker compose logs server
curl http://localhost:3000/health
```

**Port already in use**:
```bash
sudo lsof -i :3000
sudo systemctl stop tandas-backend
```

**Database connection fails**:
```bash
# Verify DATABASE_URL in .env
docker compose exec server env | grep DATABASE_URL
```

For more troubleshooting, see [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md#troubleshooting)

## 📊 API Documentation

Swagger documentation available at: `http://localhost:3000/api/v1/docs`

### Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `GET /api/v1/docs` - API documentation
- `POST /api/auth/*` - Authentication endpoints
- `/api/v1/*` - API endpoints

## 🏗 Project Structure

```
tandas-backend/
├── .github/
│   ├── workflows/          # GitHub Actions CI/CD
│   └── DEPLOYMENT.md       # Deployment guide
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts            # Database seeder
├── src/
│   ├── controllers/        # Request handlers
│   ├── services/          # Business logic
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── middlewares/       # Express middlewares
│   ├── validators/        # Input validation
│   ├── types/             # TypeScript types
│   ├── lib/               # Utilities
│   ├── config/            # Configuration
│   ├── jobs/              # Scheduled jobs
│   └── db/                # Database connection
├── scripts/
│   ├── ec2/               # EC2 deployment scripts
│   ├── verify-build.sh    # Local build verification
│   ├── deploy-manual.sh   # Manual deployment
│   └── rollback.sh        # Rollback script
├── nginx/                 # Nginx configuration
├── docker-compose.yml     # Local Docker setup
├── docker-compose.prod.yml # Production Docker setup
├── Dockerfile             # Docker image definition
├── Caddyfile             # Caddy reverse proxy (optional)
└── package.json          # Dependencies and scripts
```

## 🔒 Security

- ✅ Environment variables for secrets
- ✅ Docker secrets for build-time secrets
- ✅ CORS configuration
- ✅ Input validation
- ✅ Authentication with Better Auth
- ✅ Security headers (Nginx/Caddy)
- ✅ Rate limiting ready
- ✅ HTTPS ready (Caddy)

## 📝 Development

### Database Migrations

```bash
# Create migration
bunx prisma migrate dev --name migration_name

# Apply migrations
bunx prisma migrate deploy

# Reset database
bunx prisma migrate reset
```

### Code Quality

```bash
# Lint code
bun run lint

# Check code quality (CI)
bun run check
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 Full deployment guide: [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)
- 🐛 Report issues: GitHub Issues
- 📧 Contact: [Your contact info]

---

**Built with ❤️ for water treatment education**
