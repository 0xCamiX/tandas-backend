#!/bin/bash
# Docker build script for AWS deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Docker image for TANDAS Backend...${NC}"

# Get version from package.json or use latest
VERSION=${1:-latest}
IMAGE_NAME="tandas-backend"
REGISTRY=${AWS_ECR_REGISTRY:-""}

# Build the image
echo -e "${YELLOW}Building image: ${IMAGE_NAME}:${VERSION}${NC}"
docker build -t ${IMAGE_NAME}:${VERSION} -t ${IMAGE_NAME}:latest .

if [ -n "$REGISTRY" ]; then
    echo -e "${YELLOW}Tagging for ECR: ${REGISTRY}/${IMAGE_NAME}:${VERSION}${NC}"
    docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}
    docker tag ${IMAGE_NAME}:latest ${REGISTRY}/${IMAGE_NAME}:latest
    
    echo -e "${GREEN}Image built and tagged successfully!${NC}"
    echo -e "${YELLOW}To push to ECR, run:${NC}"
    echo "  docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
    echo "  docker push ${REGISTRY}/${IMAGE_NAME}:latest"
else
    echo -e "${GREEN}Image built successfully!${NC}"
    echo -e "${YELLOW}To tag for ECR, set AWS_ECR_REGISTRY environment variable${NC}"
fi
