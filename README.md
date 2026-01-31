# YAKU Backend API

REST API for water pretreatment educational platform.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Express.js 5
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma 7
- **Authentication:** Better Auth
- **Container:** Docker
- **Reverse Proxy:** Nginx
- **CI/CD:** GitHub Actions
- **Deployment:** AWS EC2

## Quick Start

### Development Setup

```bash
# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run migrations
bunx prisma migrate dev

# Start development server
bun run dev  # http://localhost:3000
```

### Available Scripts

```bash
bun run dev       # Development server with hot reload
bun run build     # Build for production
bun run start     # Start production server
bun run lint      # Run linter
bun run check     # Format and lint check
bun run db:seed   # Seed database
```

## Docker

### Local Development

```bash
docker compose up -d      # Start services
docker compose logs -f    # View logs
docker compose down       # Stop services
```

### Production Build

```bash
# Build image
docker build --secret id=DATABASE_URL,env=DATABASE_URL -t yaku-backend .

# Run container
docker run --env-file .env -p 3000:3000 yaku-backend
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` / `production` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `BETTER_AUTH_SECRET` | Auth secret key | Generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Backend URL | `http://localhost:3000` |
| `NEXT_PUBLIC_URL` | Frontend URL | `http://localhost:3001` |

See `.env.example` for complete configuration.

## Documentation

- **API Reference:** [docs/API.md](docs/API.md) - Complete API documentation
- **Architecture:** [docs/SDD.md](docs/SDD.md) - Technical design document
- **Product Specs:** [docs/PDD.md](docs/PDD.md) - Product requirements
- **Deployment:** [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md) - EC2 deployment guide
- **Swagger UI:** `http://localhost:3000/api/v1/docs` - Interactive API docs

## Project Structure

```
src/
├── controllers/      # Request handlers
├── services/         # Business logic
├── models/           # Data access
├── routes/           # API routes
├── middlewares/      # Authentication, validation
├── validators/       # Input schemas
├── types/            # TypeScript types
├── factories/        # Dependency injection
├── lib/              # External integrations
├── config/           # Configuration
├── jobs/             # Scheduled tasks
└── db/               # Database connection
```

## API Endpoints

### Authentication
- `POST /api/auth/sign-up/email` - Register
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-out` - Logout

### Courses
- `GET /api/v1/courses` - List courses (public)
- `GET /api/v1/courses/:id` - Get course (public)
- `POST /api/v1/courses` - Create course (protected)
- `PUT /api/v1/courses/:id` - Update course (protected)
- `DELETE /api/v1/courses/:id` - Delete course (protected)

### Modules
- `GET /api/v1/modules` - List modules (public)
- `GET /api/v1/modules/:id` - Get module (public)
- `POST /api/v1/modules` - Create module (protected)
- `PUT /api/v1/modules/:id` - Update module (protected)
- `DELETE /api/v1/modules/:id` - Delete module (protected)

### Enrollments (All Protected)
- `GET /api/v1/enrollments/me` - My enrollments
- `POST /api/v1/enrollments/courses/:courseId` - Enroll
- `DELETE /api/v1/enrollments/:id` - Unenroll

### Quizzes
- `GET /api/v1/quizzes/:id/options` - Get quiz (public)
- `POST /api/v1/quizzes/:id/attempt` - Submit attempt (protected)
- `GET /api/v1/quizzes/:id/attempts` - My attempts (protected)

### Users (All Protected)
- `GET /api/v1/users/me` - Profile
- `PUT /api/v1/users/me` - Update profile
- `GET /api/v1/users/me/stats` - Statistics
- `GET /api/v1/users/me/progress` - Progress
- `GET /api/v1/users/me/progress/:courseId` - Course progress

See [API.md](docs/API.md) for complete endpoint documentation.

## Database

### Migrations

```bash
# Create migration
bunx prisma migrate dev --name migration_name

# Apply to production
bunx prisma migrate deploy

# Generate client
bunx prisma generate

# Reset database
bunx prisma migrate reset
```

### Seed Data

```bash
bunx prisma db seed
```

## Deployment

### EC2 Deployment

**Platform:** Amazon Linux 2023 (default user: `ec2-user`)

**Complete guide:** [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)

#### Quick Setup

1. **Setup EC2 (one-time):**
```bash
scp -i your-key.pem scripts/ec2/setup-server.sh ec2-user@your-ec2-ip:~/
ssh -i your-key.pem ec2-user@your-ec2-ip
chmod +x setup-server.sh
./setup-server.sh

# Log out and back in for Docker permissions
exit
ssh -i your-key.pem ec2-user@your-ec2-ip
```

2. **Configure GitHub Secrets:**
   - `DOCKERHUB_USERNAME` & `DOCKERHUB_TOKEN`
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET` & `BETTER_AUTH_URL`
   - `NEXT_PUBLIC_URL`

3. **Deploy:**
```bash
git push origin main  # GitHub Actions handles the rest
```

### Architecture

```
Internet
   ↓
Nginx (Port 80)
   ├─ Reverse proxy
   ├─ Rate limiting: 10 req/s
   ├─ Security headers
   └─ Health checks
   ↓
Backend Container (Port 3000)
   ├─ Bun runtime
   ├─ Express.js API
   └─ Better Auth
   ↓
External PostgreSQL
```

### Service Management

```bash
# Systemd
sudo systemctl status yaku-backend
sudo systemctl restart yaku-backend
sudo journalctl -u yaku-backend -f

# Docker
docker compose ps
docker compose logs -f
docker compose restart
```

### Health Checks

```bash
# Application
curl http://localhost:3000/health

# Nginx
curl http://localhost/nginx-health

# Response
{"status":"healthy","timestamp":"...","uptime":123.45}
```

### Rollback

```bash
cd ~/app
./rollback.sh <image-tag>  # Example: main-abc1234
```

## Troubleshooting

### Container won't start
```bash
docker compose logs
docker compose down && docker compose up -d
```

### Health check fails
```bash
docker compose logs backend
docker compose exec backend curl http://localhost:3000/health
```

### Database connection fails
```bash
docker compose exec backend env | grep DATABASE_URL
```

### Permission denied (EC2)
```bash
# After setup-server.sh, log out and back in
exit
ssh -i your-key.pem ec2-user@your-ec2-ip
```

For detailed troubleshooting, see [DEPLOYMENT.md](.github/DEPLOYMENT.md).

## Security

- HTTPS required for production
- Environment variables for secrets
- Session-based authentication (HTTP-only cookies)
- Input validation with Zod schemas
- Rate limiting via Nginx (10 req/s)
- Security headers configured
- Password hashing via Better Auth
- SQL injection prevention via Prisma

## Code Quality

```bash
# Linting
bun run lint

# Format and lint check
bun run check

# Build verification
bun run build
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

See [LICENSE](LICENSE) file for details.

## Support

- API Documentation: `http://localhost:3000/api/v1/docs`
- Deployment Guide: [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)
- GitHub Issues: Report bugs and request features

---

Built for water treatment education
