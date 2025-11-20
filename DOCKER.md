# Docker Setup Guide

## Quick Start

### Development Mode

Run with hot-reload (code changes reflected immediately):

```bash
npm run docker:dev
```

Or manually:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Stop development container:

```bash
npm run docker:dev:down
```

### Production Mode

Build and run in production mode (detached):

```bash
npm run docker:prod
```

Or manually:

```bash
docker-compose up --build -d
```

View logs:

```bash
npm run docker:logs
```

Stop production container:

```bash
npm run docker:prod:down
```

Restart container:

```bash
npm run docker:restart
```

## Features

### Development Environment

- ✅ Hot reload with volume mounting
- ✅ Includes dev dependencies (nodemon)
- ✅ Source code changes reflected immediately
- ✅ Easy debugging

### Production Environment

- ✅ Optimized multi-stage build
- ✅ Only production dependencies
- ✅ Runs as non-root user (security)
- ✅ Health checks enabled
- ✅ Auto-restart on failure
- ✅ Smaller image size

## Environment Variables

Make sure `src/config/.env` exists with:

```env
PORT=3000
MONGOURL=your_mongo_connection
DBNAME=phoenix
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=30d
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=your_callback_url
SESSION_SECRET=your_session_secret
```

## Useful Commands

```bash
# View running containers
docker ps

# View logs in real-time
docker-compose logs -f

# Access container shell
docker exec -it phoenix-api-prod sh

# Rebuild without cache
docker-compose build --no-cache

# Remove all containers and networks
docker-compose down -v
```

## Security Notes

- Never commit `.env` files
- Use secrets management in production
- The non-root user runs the app in production
- Health checks ensure container stability
