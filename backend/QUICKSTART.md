# ⚡ SOOTHE CMS Backend - Quick Start Guide

Get the backend running in **5 minutes**!

---

## 🚀 Prerequisites

- **Node.js** 18+ installed
- **PostgreSQL** 14+ installed and running
- **npm** or **yarn**

---

## 📦 Installation (Local Development)

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

```bash
cp .env.example .env
```

**Edit `.env` file** and update:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/soothe_cms"
```

### 4. Setup database

```bash
# Create database
createdb soothe_cms

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

### 5. Start the server

```bash
npm run start:dev
```

---

## ✅ Verify Installation

Open your browser:

- **API**: http://localhost:3000/api/v1/settings
- **Swagger Docs**: http://localhost:3000/api/docs

---

## 🔑 Default Login Credentials

After seeding the database:

- **Email**: `admin@soothe.com`
- **Password**: `Admin@123`

⚠️ **Change this password immediately!**

---

## 🧪 Test the API

### 1. Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@soothe.com",
    "password": "Admin@123"
  }'
```

### 2. Use the access token

Copy the `accessToken` from the response and use it:

```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🐳 Docker Quick Start (Alternative)

If you prefer Docker:

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx prisma db seed

# View logs
docker-compose logs -f backend
```

Access at: http://localhost:3000

---

## 📝 Next Steps

1. Explore the **Swagger Documentation**: http://localhost:3000/api/docs
2. Import **Postman Collection**: `POSTMAN_COLLECTION.json`
3. Read the full **README.md** for detailed documentation
4. Check **DEPLOYMENT.md** for production deployment

---

## 🛠️ Common Commands

```bash
# Development
npm run start:dev        # Start with hot-reload

# Database
npm run prisma:studio    # Open database GUI
npm run prisma:migrate   # Run migrations

# Build
npm run build           # Build for production
npm run start:prod      # Start production server

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
```

---

## 🐛 Troubleshooting

### Database connection error?

Make sure PostgreSQL is running:

```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Check status
psql --version
```

### Port 3000 already in use?

Change the port in `.env`:

```env
PORT=3001
```

### Prisma issues?

Reset everything:

```bash
npm run prisma:migrate reset
npm run prisma:generate
npm run prisma:seed
```

---

## 📚 Documentation

- **Full Documentation**: [README.md](README.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **API Docs**: http://localhost:3000/api/docs (when running)

---

## 🆘 Need Help?

- Check the **README.md** for detailed documentation
- View logs: `tail -f logs/combined.log`
- Email: support@soothe.com

---

**You're all set! Happy coding! 🎉**
