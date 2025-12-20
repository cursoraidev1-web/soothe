# SOOTHE CMS - Backend & Database Setup Guide

This guide provides complete information about the SOOTHE CMS backend architecture, database setup, and how to connect the frontend. Use this document with ChatGPT or any AI assistant to get step-by-step deployment instructions.

## 📋 Project Overview

**SOOTHE CMS** is a full-stack content management system with:
- **Backend**: NestJS (Node.js framework) with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: Next.js (main website)
- **Admin Panel**: Next.js (separate admin interface)
- **Deployment Target**: Render.com (or similar Node.js hosting)

## 🏗️ Project Structure

```
soothebck/
├── backend/              # NestJS backend API
│   ├── src/             # Source code
│   ├── prisma/          # Database schema and migrations
│   │   └── schema.prisma # Database schema definition
│   ├── package.json     # Backend dependencies
│   └── .env            # Environment variables (create this)
├── admin-panel/         # Next.js admin dashboard
└── (root)/              # Next.js main website frontend
```

## 🗄️ Database Architecture

The backend uses **PostgreSQL** with **Prisma ORM**. The database schema includes:

### Main Models:
- **User**: Admin users with roles (SUPER_ADMIN, ADMIN, EDITOR, AUTHOR, VIEWER)
- **Settings**: Site-wide configuration
- **Page**: Dynamic pages with JSON content blocks
- **SolutionCategory** & **Solution**: Product/service solutions
- **BlogPost**: Blog articles with rich content
- **Career** & **Applicant**: Job listings and applications
- **Team**: Team member profiles
- **ContactSubmission**: Contact form submissions
- **Media**: File uploads (images, PDFs, videos)
- **Accessibility**: Accessibility settings and compliance

### Database Connection:
- Uses `DATABASE_URL` environment variable
- Format: `postgresql://user:password@host:port/database?schema=public`
- Prisma handles migrations and schema management

## 🔧 Backend Setup Requirements

### Prerequisites:
1. **Node.js** 18.x or higher
2. **PostgreSQL** database (local or cloud)
3. **npm** or **yarn** package manager

### Backend Technology Stack:
- **Framework**: NestJS 10.x
- **ORM**: Prisma 5.x
- **Database**: PostgreSQL
- **Authentication**: JWT (access + refresh tokens)
- **File Uploads**: Multer (local filesystem storage)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI

## 📝 Required Environment Variables

Create a `.env` file in the `backend/` directory with these variables:

### **Required Variables:**

```env
# Database Connection (REQUIRED)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# JWT Authentication (REQUIRED)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"

# Optional JWT Expiration (defaults shown)
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# CORS Configuration (REQUIRED for production)
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
# For production: "https://yourdomain.com,https://admin.yourdomain.com"

# Server Port (optional, defaults to 3000)
PORT=3000

# Environment
NODE_ENV="development"  # or "production"
```

### **Optional Variables:**

```env
# Rate Limiting
THROTTLE_TTL=60        # Time window in seconds
THROTTLE_LIMIT=10      # Max requests per window

# File Upload Limits
MAX_FILE_SIZE=10485760  # 10MB in bytes

# Email/SMTP (for contact form notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@yourdomain.com"

# File Upload Path (optional, defaults to ./uploads/cvs for CVs)
UPLOAD_PATH="./uploads/cvs"
```

## 🚀 Backend Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install --legacy-peer-deps
```

### 2. Database Setup
```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with initial data
npm run prisma:seed
```

### 3. Create Initial Admin User
After database is set up, you need to create the first admin user. This can be done via:
- Prisma Studio: `npm run prisma:studio`
- Database seed script (if configured)
- API endpoint (after first deployment)

### 4. Build Backend
```bash
npm run build
```

### 5. Start Backend
```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### 6. Verify Backend
- API should be available at: `http://localhost:3000/api/v1`
- Swagger docs at: `http://localhost:3000/api/docs`
- Health check: `GET http://localhost:3000/api/v1/health` (if implemented)

## 🔗 Connecting Frontend to Backend

### Frontend Configuration

The frontend needs to know the backend API URL. Configure this in your frontend environment:

**For Main Website (root directory):**
```env
# .env.local or .env.production
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
# Production: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
```

**For Admin Panel (admin-panel directory):**
```env
# admin-panel/.env.local or .env.production
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
# Production: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
```

### API Endpoints Structure

All backend endpoints are prefixed with `/api/v1`:

- **Authentication**: `/api/v1/auth/login`, `/api/v1/auth/refresh`
- **Settings**: `/api/v1/settings`
- **Pages**: `/api/v1/pages`
- **Solutions**: `/api/v1/solutions`
- **Blog**: `/api/v1/blog`
- **Careers**: `/api/v1/careers`
- **Team**: `/api/v1/team`
- **Contact**: `/api/v1/contact`
- **Media**: `/api/v1/media`

### CORS Configuration

The backend CORS is configured to allow requests from:
- Development: `http://localhost:3000`, `http://localhost:3001`
- Production: Your frontend domain(s) specified in `CORS_ORIGIN`

**Important**: Update `CORS_ORIGIN` in production to include your actual frontend URLs.

## 📦 Deployment to Render.com

### Backend Deployment:

1. **Create Web Service** on Render
2. **Connect Repository** (GitHub/GitLab)
3. **Build Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment**: `Node`

4. **Environment Variables** (set in Render dashboard):
   - `DATABASE_URL` (from Render PostgreSQL or external)
   - `JWT_SECRET` (generate strong random string)
   - `JWT_REFRESH_SECRET` (generate strong random string)
   - `CORS_ORIGIN` (your frontend URLs, comma-separated)
   - `NODE_ENV=production`
   - `PORT` (Render sets this automatically, but can override)

5. **Database Setup**:
   - Option A: Use Render PostgreSQL (recommended)
     - Create PostgreSQL database in Render
     - Use the provided `DATABASE_URL`
   - Option B: External PostgreSQL
     - Provide your own `DATABASE_URL`

6. **Run Migrations**:
   - After first deployment, run migrations:
   ```bash
   # Via Render shell or locally with production DATABASE_URL
   npm run prisma:migrate deploy
   ```

### Frontend Deployment:

1. **Main Website**: Deploy to Vercel/Netlify/Render
   - Set `NEXT_PUBLIC_API_URL` to your backend URL
   - Example: `https://soothe-backend.onrender.com/api/v1`

2. **Admin Panel**: Deploy separately
   - Set `NEXT_PUBLIC_API_URL` to your backend URL
   - Same backend URL as main website

## 🔐 Security Considerations

1. **JWT Secrets**: Use strong, random strings (minimum 32 characters)
   - Generate: `openssl rand -base64 32`

2. **Database**: Use connection pooling in production
   - Render PostgreSQL includes this automatically

3. **CORS**: Restrict to specific domains in production
   - Never use `*` in production

4. **File Uploads**: Currently stored on local filesystem
   - For production, consider S3 or similar object storage
   - Files are served from `/uploads` directory

## 📊 Database Migrations

### Development:
```bash
npm run prisma:migrate dev
```

### Production:
```bash
npm run prisma:migrate deploy
```

### View Database:
```bash
npm run prisma:studio
```

## 🧪 Testing the Setup

1. **Backend Health**: Check if API responds
   ```bash
   curl http://localhost:3000/api/v1/settings
   ```

2. **Database Connection**: Check backend logs for "✅ Database connected successfully"

3. **Frontend Connection**: 
   - Open browser console
   - Check network tab for API calls
   - Verify requests go to correct backend URL

## 🐛 Common Issues

### Database Connection Failed
- Check `DATABASE_URL` format
- Verify database is accessible
- Check firewall/network settings

### CORS Errors
- Verify `CORS_ORIGIN` includes frontend URL
- Check for trailing slashes
- Ensure credentials are handled correctly

### Build Failures
- Use `--legacy-peer-deps` flag for npm install
- Check Node.js version (18.x required)
- Verify all environment variables are set

### Migration Errors
- Ensure database exists
- Check `DATABASE_URL` is correct
- Run `prisma generate` before migrations

## 📚 Additional Resources

- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **Render Docs**: https://render.com/docs
- **API Documentation**: Available at `/api/docs` when backend is running

## 🎯 Quick Start Checklist

- [ ] Install Node.js 18+
- [ ] Set up PostgreSQL database
- [ ] Create `backend/.env` with all required variables
- [ ] Run `npm install --legacy-peer-deps` in backend
- [ ] Run `npm run prisma:generate`
- [ ] Run `npm run prisma:migrate`
- [ ] Build backend: `npm run build`
- [ ] Start backend: `npm run start:dev`
- [ ] Verify API at `http://localhost:3000/api/docs`
- [ ] Configure frontend `NEXT_PUBLIC_API_URL`
- [ ] Test frontend-backend connection

---

**Note for AI Assistants**: Use this document to provide step-by-step instructions for setting up the backend, configuring the database, running migrations, setting environment variables, and connecting the frontend. Focus on practical, actionable steps with code examples where relevant.



