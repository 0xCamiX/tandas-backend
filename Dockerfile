# Multi-stage build for optimized production image
# Stage 1: Dependencies and build
FROM oven/bun:1.1.0 AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for Prisma
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json bun.lock ./

# Install dependencies (production only in final stage)
RUN bun install --frozen-lockfile --production=false

# Copy Prisma schema and config
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Generate Prisma Client
RUN bunx prisma generate

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production runtime
FROM oven/bun:1.1.0-slim AS runtime

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Install only runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy package files for production install
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production=true && \
    bun pm cache rm

# Copy Prisma files
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Generate Prisma Client in production
RUN bunx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated

# Copy necessary source files (for runtime)
COPY src ./src

# Set ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check for AWS ECS/EC2
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD bun --bun -e "fetch('http://localhost:3000/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))" || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV BUN_ENV=production

# Use Bun's production optimizations
ENV BUN_JSC_forceGC=1

# Start the application
CMD ["bun", "run", "dist/server.js"]
