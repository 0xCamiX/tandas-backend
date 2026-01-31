# 🧪 Local Testing & Verification Guide

This guide helps you verify that everything is set up correctly before deploying to production.

## Pre-Deployment Checklist

### 1. Environment Setup

- [ ] `.env` file created and configured
- [ ] All required environment variables set
- [ ] Database URL is valid and accessible
- [ ] Secrets are properly generated (not using defaults)

```bash
# Verify .env exists
test -f .env && echo "✓ .env exists" || echo "✗ .env missing"

# Generate strong secrets if needed
openssl rand -base64 32
```

### 2. Dependencies

- [ ] Bun installed and working
- [ ] All dependencies installed
- [ ] No security vulnerabilities

```bash
# Check Bun version
bun --version

# Install dependencies
bun install

# Check for vulnerabilities (if you have npm audit for bun)
# bun audit or similar
```

### 3. Database

- [ ] PostgreSQL is accessible
- [ ] Database migrations are up to date
- [ ] Can connect to database

```bash
# Test database connection
bunx prisma db pull --schema=prisma/schema.prisma

# Check migration status
bunx prisma migrate status

# Apply migrations if needed
bunx prisma migrate deploy
```

### 4. Code Quality

- [ ] Code passes linter checks
- [ ] No TypeScript errors
- [ ] Build completes successfully

```bash
# Run linter
bun run check

# Build application
bun run build

# Check build output
ls -lh dist/
```

### 5. Local Docker Build

- [ ] Docker is installed and running
- [ ] Docker Compose is available
- [ ] Build completes without errors
- [ ] Container starts successfully
- [ ] Health check passes

```bash
# Verify Docker installation
docker --version
docker compose version

# Run comprehensive verification
./scripts/verify-build.sh

# Or manual testing:
docker compose build
docker compose up -d
docker compose ps
curl http://localhost:3000/health
docker compose logs
docker compose down
```

### 6. API Endpoints

Test key endpoints locally:

- [ ] Root endpoint: `GET /`
- [ ] Health check: `GET /health`
- [ ] API docs: `GET /api/v1/docs`
- [ ] Auth endpoints: `POST /api/auth/*`

```bash
# Start local server
bun run dev

# In another terminal:
# Test root
curl http://localhost:3000/

# Test health
curl http://localhost:3000/health

# Test API docs (in browser)
open http://localhost:3000/api/v1/docs
```

## Docker Verification Steps

### Step 1: Clean Environment

```bash
# Remove old containers and images
docker compose down -v
docker system prune -a
```

### Step 2: Build Image

```bash
# Build without cache
docker compose build --no-cache

# Check image size
docker images | grep yaku
```

Expected image size: ~200-400MB

### Step 3: Start Services

```bash
# Start in detached mode
docker compose up -d

# Check container status
docker compose ps

# Should show "healthy" status
```

### Step 4: Verify Health

```bash
# Wait for service to be ready
sleep 10

# Check health endpoint
curl -v http://localhost:3000/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2024-...",
#   "uptime": 10.5
# }
```

### Step 5: Check Logs

```bash
# View logs
docker compose logs

# Look for:
# - "Server running on port..."
# - No error messages
# - Successful database connection
```

### Step 6: Test API

```bash
# Test root endpoint
curl http://localhost:3000/

# Test API endpoints
curl http://localhost:3000/api/v1/courses

# Test auth (if applicable)
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Step 7: Cleanup

```bash
# Stop containers
docker compose down

# Verify everything stopped
docker compose ps
```

## Production Docker Compose Verification

Test production configuration locally:

```bash
# Set environment variables
export DOCKERHUB_USERNAME=your-username
export IMAGE_TAG=test

# Build and tag image for production testing
docker build -t $DOCKERHUB_USERNAME/yaku-backend:$IMAGE_TAG .

# Test with production compose file
docker compose -f docker-compose.prod.yml config

# Start with production config (adjust env vars)
# docker compose -f docker-compose.prod.yml up -d
```

## Performance Testing

### Response Time

```bash
# Test response time
time curl http://localhost:3000/health

# Should be < 100ms for health check
```

### Load Testing (Optional)

```bash
# Install Apache Bench if not installed
# macOS: brew install httpd
# Ubuntu: apt-get install apache2-utils

# Simple load test
ab -n 1000 -c 10 http://localhost:3000/health

# Look for:
# - 0 failed requests
# - Average response time < 100ms
```

### Memory Usage

```bash
# Check container memory
docker stats --no-stream

# Memory usage should be < 512MB under normal load
```

## GitHub Actions Validation

### Workflow Syntax

```bash
# Install act (GitHub Actions local runner)
# macOS: brew install act
# Ubuntu: see https://github.com/nektos/act

# Validate workflow files
cd .github/workflows
for file in *.yml; do
  echo "Checking $file..."
  # You can use yamllint or similar
done
```

### Secrets Check

Verify all required secrets are documented:

- [ ] DOCKERHUB_USERNAME
- [ ] DOCKERHUB_TOKEN
- [ ] EC2_HOST
- [ ] EC2_USER
- [ ] EC2_SSH_KEY
- [ ] DATABASE_URL
- [ ] BETTER_AUTH_SECRET
- [ ] BETTER_AUTH_URL
- [ ] NEXT_PUBLIC_URL

## Common Issues & Solutions

### Issue: Build fails with "DATABASE_URL not found"

**Solution**: Ensure DATABASE_URL is in `.env` or passed as build secret

```bash
docker build --secret id=DATABASE_URL,env=DATABASE_URL -t test .
```

### Issue: Container exits immediately

**Solution**: Check logs for errors

```bash
docker compose logs
# Look for error messages
```

### Issue: Health check never passes

**Solution**: Increase startup time or check application errors

```bash
# Check if app is listening
docker compose exec server netstat -tlnp

# Check environment variables
docker compose exec server env
```

### Issue: Port 3000 already in use

**Solution**: Stop conflicting process or change port

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change PORT in .env
```

## Final Pre-Deployment Checklist

Before deploying to EC2:

- [ ] All local tests pass
- [ ] Docker build completes successfully
- [ ] Container runs and health checks pass
- [ ] API endpoints respond correctly
- [ ] No errors in logs
- [ ] GitHub secrets configured
- [ ] EC2 instance is set up
- [ ] Database is accessible from EC2
- [ ] Backup of current production (if applicable)

## Deployment Readiness Score

Calculate your readiness:

- Dependencies OK: 10 points
- Code quality OK: 15 points
- Database OK: 15 points
- Docker build OK: 20 points
- Local tests pass: 20 points
- Documentation reviewed: 10 points
- Secrets configured: 10 points

**Total: ___ / 100 points**

- **90-100**: Ready to deploy ✅
- **70-89**: Review issues, then deploy ⚠️
- **< 70**: Fix issues before deploying ❌

## Running Quick Verification

```bash
# All-in-one verification script
./scripts/verify-build.sh

# This will:
# - Check Docker installation
# - Build the image
# - Start containers
# - Run health checks
# - Display logs
# - Clean up

# If all checks pass: ✅ Ready to deploy!
```

## Next Steps After Verification

1. Review [DEPLOYMENT.md](DEPLOYMENT.md)
2. Configure GitHub Secrets
3. Push to main branch
4. Monitor GitHub Actions
5. Verify deployment on EC2
6. Test production endpoints

---

**Remember**: Always test locally before deploying to production! 🚀

