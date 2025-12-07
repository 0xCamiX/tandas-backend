# AWS Deployment Guide

## Prerequisites

1. AWS CLI configured
2. Docker installed locally
3. ECR repository created
4. ECS cluster or EC2 instance ready

## Deployment Steps

### 1. Build and Tag Docker Image

```bash
# Build the image
docker build -t tandas-backend:latest .

# Tag for ECR (replace with your AWS account ID and region)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

docker tag tandas-backend:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest
```

### 2. Push to ECR

```bash
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest
```

### 3. Deploy to ECS

#### Option A: Using ECS Task Definition

```json
{
  "family": "tandas-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "tandas-backend",
      "image": "<AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "3000"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:name"
        },
        {
          "name": "AUTH_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:name"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "bun --bun -e \"fetch('http://localhost:3000/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))\""],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/tandas-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Option B: Using EC2 with Docker

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-instance

# Install Docker (if not installed)
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Pull and run
docker pull <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest
docker run -d \
  --name tandas-backend \
  --restart unless-stopped \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e AUTH_SECRET="your-auth-secret" \
  -e NODE_ENV=production \
  <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/tandas-backend:latest
```

### 4. Security Best Practices

1. **Use AWS Secrets Manager** for sensitive environment variables
2. **Enable VPC** for network isolation
3. **Use Security Groups** to restrict access
4. **Enable CloudWatch Logs** for monitoring
5. **Use IAM Roles** instead of access keys
6. **Enable SSL/TLS** with Application Load Balancer
7. **Regularly update** base images and dependencies

### 5. Monitoring and Logging

```bash
# View logs in CloudWatch
aws logs tail /ecs/tandas-backend --follow

# Or with Docker
docker logs -f tandas-backend
```

### 6. Health Checks

The application includes a `/health` endpoint` that returns:
- Status: healthy
- Timestamp
- Uptime

Configure your load balancer to use this endpoint for health checks.

## Environment Variables

Store sensitive variables in AWS Secrets Manager:

- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Better Auth secret (min 32 chars)
- `NEXT_PUBLIC_URL` - Frontend URL
- `CRON_SECRET` - Optional, for cron job authentication

## Scaling

For ECS Fargate:
- Configure Auto Scaling based on CPU/Memory metrics
- Set min/max task count
- Use Application Load Balancer for distribution

For EC2:
- Use Auto Scaling Groups
- Configure multiple instances behind a load balancer
