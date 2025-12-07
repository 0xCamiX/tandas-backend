# Docker Deployment Guide

## Quick Start

### Development

```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Or using Dockerfile directly
docker build -f Dockerfile.dev -t tandas-backend:dev .
docker run -p 3000:3000 --env-file .env tandas-backend:dev
```

### Production

```bash
# Build production image
docker build -t tandas-backend:latest .

# Run production container
docker run -d \
  --name tandas-backend \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  tandas-backend:latest

# Or using docker-compose
docker-compose up -d
```

## Image Features

### Security
- ✅ Multi-stage build for smaller image size
- ✅ Non-root user execution
- ✅ Minimal base image (bun:1.1.0-slim)
- ✅ No unnecessary packages
- ✅ Health check endpoint

### Performance
- ✅ Production dependencies only
- ✅ Optimized Bun runtime
- ✅ Prisma Client pre-generated
- ✅ Application pre-built

### Monitoring
- ✅ Health check endpoint at `/health`
- ✅ Structured logging
- ✅ Resource limits configured

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Better Auth secret (min 32 characters)
- `NEXT_PUBLIC_URL` - Frontend URL for CORS

Optional:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (production/development)
- `CRON_SECRET` - Secret for cron job authentication
- `PRISMA_ACCELERATE_URL` - Prisma Accelerate URL for serverless

## Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 1234.56
}
```

## Building for AWS

### Using Scripts

```bash
# Set AWS credentials
export AWS_ACCOUNT_ID=123456789012
export AWS_REGION=us-east-1

# Deploy to ECR
./scripts/aws-deploy.sh v1.0.0
```

### Manual Steps

1. **Build image:**
   ```bash
   docker build -t tandas-backend:latest .
   ```

2. **Login to ECR:**
   ```bash
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin \
     <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
   ```

3. **Tag and push:**
   ```bash
   docker tag tandas-backend:latest \
     <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest
   
   docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest
   ```

## Image Size Optimization

The multi-stage build reduces the final image size by:
- Using slim base image in runtime stage
- Installing only production dependencies
- Removing build tools and cache
- Pre-generating Prisma Client

Expected image size: ~200-300MB

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs tandas-backend

# Check health
docker exec tandas-backend curl http://localhost:3000/health
```

### Database connection issues

- Verify `DATABASE_URL` is correct
- Check network connectivity
- Ensure database is accessible from container

### Prisma Client not found

The Prisma Client is generated during build. If you see errors:
1. Rebuild the image
2. Verify `prisma/schema.prisma` is included
3. Check `prisma.config.ts` exists

## Best Practices

1. **Use secrets management** - Store sensitive data in AWS Secrets Manager
2. **Enable logging** - Configure CloudWatch or similar
3. **Set resource limits** - Prevent resource exhaustion
4. **Regular updates** - Keep base images and dependencies updated
5. **Security scanning** - Scan images for vulnerabilities
6. **Health checks** - Configure load balancer health checks
7. **Backup strategy** - Regular database backups

## Production Checklist

- [ ] Environment variables configured
- [ ] Secrets stored in AWS Secrets Manager
- [ ] Health check endpoint working
- [ ] Logging configured
- [ ] Resource limits set
- [ ] Security groups configured
- [ ] SSL/TLS enabled
- [ ] Monitoring and alerts set up
- [ ] Backup strategy in place
- [ ] Disaster recovery plan
