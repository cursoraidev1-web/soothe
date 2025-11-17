# 🚀 SOOTHE CMS Backend - Deployment Guide

Complete deployment instructions for production environments.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Options](#deployment-options)
- [Docker Deployment](#docker-deployment)
- [VPS/Cloud Deployment](#vpscloud-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [HTTPS/SSL Setup](#httpsssl-setup)
- [Monitoring & Logs](#monitoring--logs)
- [Backup Strategy](#backup-strategy)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

- Domain name (e.g., `api.soothe.com`)
- Server with:
  - **OS**: Ubuntu 20.04+ / Debian 11+
  - **RAM**: Minimum 2GB (4GB recommended)
  - **CPU**: 2+ cores
  - **Storage**: 20GB+ SSD
- PostgreSQL 14+
- Node.js 18+
- SSL certificate (Let's Encrypt recommended)

---

## 🎯 Deployment Options

### Option 1: Docker (Recommended)
- Easiest to deploy
- Consistent environment
- Easy to scale

### Option 2: Traditional VPS/Cloud
- More control
- Direct server management
- PM2 process management

### Option 3: Platform-as-a-Service
- Heroku, Railway, Render
- Managed infrastructure
- Quick deployment

---

## 🐳 Docker Deployment

### 1. Create Dockerfile

Create `Dockerfile` in backend directory:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Create uploads directory
RUN mkdir -p uploads/media uploads/cvs logs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/v1/settings', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/main"]
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: soothe_postgres
    restart: always
    environment:
      POSTGRES_DB: soothe_cms
      POSTGRES_USER: soothe_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - soothe_network

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: soothe_backend
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://soothe_user:${DB_PASSWORD}@postgres:5432/soothe_cms?schema=public
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      NODE_ENV: production
      PORT: 3000
    depends_on:
      - postgres
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    networks:
      - soothe_network

  nginx:
    image: nginx:alpine
    container_name: soothe_nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
    networks:
      - soothe_network

volumes:
  postgres_data:

networks:
  soothe_network:
    driver: bridge
```

### 3. Create nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:3000;
    }

    server {
        listen 80;
        server_name api.soothe.com;

        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name api.soothe.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # Max upload size
        client_max_body_size 10M;

        # Proxy settings
        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Serve uploaded files
        location /uploads {
            alias /app/uploads;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 4. Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database (first time only)
docker-compose exec backend npx prisma db seed

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## 🖥️ VPS/Cloud Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. Setup PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE soothe_cms;
CREATE USER soothe_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE soothe_cms TO soothe_user;
\q
```

### 3. Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm ci

# Create .env file
cp .env.example .env
nano .env  # Edit with production values

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (first time)
npx prisma db seed

# Build application
npm run build

# Start with PM2
pm2 start dist/main.js --name soothe-cms

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 4. Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/soothe-cms
```

Add configuration:

```nginx
server {
    listen 80;
    server_name api.soothe.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/soothe-cms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 HTTPS/SSL Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.soothe.com

# Auto-renewal (Certbot sets this up automatically)
# Test renewal
sudo certbot renew --dry-run
```

---

## 🌍 Environment Configuration

### Production .env Example

```env
# Database
DATABASE_URL="postgresql://soothe_user:SECURE_PASSWORD@localhost:5432/soothe_cms?schema=public"

# JWT (Use strong random strings)
JWT_SECRET="generate-with-openssl-rand-base64-32"
JWT_REFRESH_SECRET="generate-with-openssl-rand-base64-32"
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Application
PORT=3000
NODE_ENV="production"
CORS_ORIGIN="https://soothe.com,https://www.soothe.com"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH="./uploads"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="noreply@soothe.com"
SMTP_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@soothe.com"

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

### Generate Secure Secrets

```bash
# Generate JWT secrets
openssl rand -base64 32
```

---

## 📊 Monitoring & Logs

### PM2 Monitoring

```bash
# View all processes
pm2 list

# View logs
pm2 logs soothe-cms

# Monitor resources
pm2 monit

# View detailed info
pm2 show soothe-cms
```

### Application Logs

Logs are stored in `logs/` directory:
- `error.log` - Error logs
- `combined.log` - All logs

### Setup Log Rotation

```bash
# Install logrotate
sudo apt install logrotate

# Create logrotate config
sudo nano /etc/logrotate.d/soothe-cms
```

Add:

```
/path/to/backend/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    missingok
    copytruncate
}
```

---

## 💾 Backup Strategy

### Database Backup

```bash
# Create backup script
nano ~/backup-db.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/soothe"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U soothe_user soothe_cms > $BACKUP_DIR/soothe_cms_$DATE.sql

# Compress
gzip $BACKUP_DIR/soothe_cms_$DATE.sql

# Delete backups older than 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: soothe_cms_$DATE.sql.gz"
```

Make executable and schedule:

```bash
chmod +x ~/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/ubuntu/backup-db.sh
```

### Files Backup

```bash
# Backup uploads directory
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

---

## 🔧 Troubleshooting

### Check Service Status

```bash
# Check PM2
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check PostgreSQL
sudo systemctl status postgresql
```

### View Logs

```bash
# Application logs
pm2 logs soothe-cms

# Nginx logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

### Common Issues

#### Port Already in Use

```bash
# Find process
lsof -ti:3000

# Kill process
kill -9 <PID>
```

#### Database Connection Failed

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U soothe_user -d soothe_cms -h localhost
```

#### Permission Issues

```bash
# Fix uploads directory permissions
chmod -R 755 uploads/
chown -R $USER:$USER uploads/
```

---

## 📈 Performance Optimization

### Enable Gzip Compression (Nginx)

Add to nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### Database Connection Pooling

Prisma handles this automatically, but you can configure it:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public&connection_limit=10&pool_timeout=30"
```

---

## 🎯 Post-Deployment Checklist

- [ ] Change default admin password
- [ ] Configure all environment variables
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS for your domain
- [ ] Set up database backups
- [ ] Configure log rotation
- [ ] Set up monitoring
- [ ] Test all API endpoints
- [ ] Configure email notifications
- [ ] Set up firewall rules
- [ ] Document any custom configurations

---

## 🆘 Support

For deployment support, contact: devops@soothe.com

---

**Deployment Complete! 🎉**
