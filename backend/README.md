# 🚀 SOOTHE CMS Backend API

**Production-ready Backend CMS for SOOTHE TECHNOLOGIES LIMITED**

Built with **Node.js**, **NestJS**, **Prisma**, and **PostgreSQL**.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [File Uploads](#file-uploads)
- [Email Notifications](#email-notifications)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## ✨ Features

- ✅ **Complete Authentication System** (JWT with refresh tokens)
- ✅ **Role-Based Access Control (RBAC)** - 5 user roles
- ✅ **Dynamic Page Builder** with JSON content blocks
- ✅ **Solutions Management** with categories
- ✅ **Blog System** with auto-calculated reading time
- ✅ **Careers & Applicants** module with CV uploads
- ✅ **Team Members** management
- ✅ **Contact Form** with email notifications
- ✅ **Media Library** with accessibility-first file uploads
- ✅ **Accessibility Configuration** module
- ✅ **Global Site Settings**
- ✅ **Full Swagger/OpenAPI Documentation**
- ✅ **Security** (Helmet, CORS, Rate Limiting)
- ✅ **Input Validation** & Sanitization
- ✅ **Pagination** on all list endpoints
- ✅ **Database Indexes** for performance
- ✅ **Structured Logging** with Winston
- ✅ **Clean Architecture** (Controllers → Services → Repositories)

---

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: NestJS 10
- **Database**: PostgreSQL
- **ORM**: Prisma 5
- **Authentication**: JWT (access + refresh tokens)
- **Password Hashing**: bcrypt
- **Validation**: class-validator & class-transformer
- **File Upload**: Multer + Sharp (image processing)
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** or **yarn**
- **PostgreSQL** >= 14.x
- **Git**

---

## 🔧 Installation

### 1. Clone the repository

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

---

## ⚙️ Configuration

### 1. Create environment file

Copy the example environment file:

```bash
cp .env.example .env
```

### 2. Configure environment variables

Edit `.env` file with your settings:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/soothe_cms?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

# Application
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH="./uploads"

# Email (for contact form notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-email-password"
ADMIN_EMAIL="admin@soothe.com"

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

---

## 🗄️ Database Setup

### 1. Create PostgreSQL database

```bash
createdb soothe_cms
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

### 3. Run migrations

```bash
npm run prisma:migrate
```

### 4. Seed the database (optional)

This will create:
- Super Admin user (email: `admin@soothe.com`, password: `Admin@123`)
- Default settings
- Sample data

```bash
npm run prisma:seed
```

### 5. Open Prisma Studio (optional)

View and edit your database in a GUI:

```bash
npm run prisma:studio
```

---

## 🚀 Running the Application

### Development mode (with hot-reload)

```bash
npm run start:dev
```

### Production mode

```bash
npm run build
npm run start:prod
```

### Debug mode

```bash
npm run start:debug
```

The API will be available at:
- **API**: `http://localhost:3000/api/v1`
- **Swagger Docs**: `http://localhost:3000/api/docs`

---

## 📚 API Documentation

### Swagger UI

Once the application is running, access the interactive API documentation:

**http://localhost:3000/api/docs**

### Features:
- 📖 Complete API reference
- 🧪 Test endpoints directly from browser
- 🔒 JWT authentication support
- 📝 Request/response examples
- 🏷️ Organized by modules

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Database seeding
│   └── migrations/          # Database migrations
├── src/
│   ├── auth/                # Authentication module
│   │   ├── decorators/      # Custom decorators (GetUser, Roles, Public)
│   │   ├── dto/             # Data transfer objects
│   │   ├── guards/          # JWT & RBAC guards
│   │   ├── strategies/      # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/               # Users management
│   ├── settings/            # Site settings
│   ├── pages/               # Dynamic pages
│   ├── solutions/           # Solutions & categories
│   ├── accessibility/       # Accessibility config
│   ├── blog/                # Blog posts
│   ├── careers/             # Job postings
│   ├── applicants/          # Job applications
│   ├── team/                # Team members
│   ├── contact/             # Contact form
│   ├── media/               # Media library
│   ├── prisma/              # Prisma service
│   ├── app.module.ts        # Root module
│   └── main.ts              # Application entry point
├── uploads/                 # File uploads directory
├── logs/                    # Application logs
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

---

## 🔌 API Endpoints

### **Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user profile

### **Users** (Admin only)
- `GET /admin/users` - Get all users
- `GET /admin/users/:id` - Get user by ID
- `POST /admin/users` - Create user
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

### **Settings**
- `GET /settings` - Get site settings (Public)
- `PUT /settings` - Update settings (Admin)

### **Pages**
- `GET /pages` - Get all published pages (Public)
- `GET /pages/:slug` - Get page by slug (Public)
- `POST /admin/pages` - Create page (Admin/Editor)
- `PUT /admin/pages/:id` - Update page (Admin/Editor)
- `DELETE /admin/pages/:id` - Delete page (Admin)

### **Solutions**
- `GET /solutions` - Get all solutions (Public)
- `GET /solutions/:slug` - Get solution by slug (Public)
- `POST /admin/solutions` - Create solution (Admin/Editor)
- `PUT /admin/solutions/:id` - Update solution (Admin/Editor)
- `DELETE /admin/solutions/:id` - Delete solution (Admin)

### **Solution Categories**
- `GET /solutions/categories` - Get all categories (Public)
- `POST /solutions/categories` - Create category (Admin/Editor)
- `PUT /solutions/categories/:id` - Update category (Admin/Editor)
- `DELETE /solutions/categories/:id` - Delete category (Admin)

### **Accessibility**
- `GET /accessibility` - Get accessibility config (Public)
- `PUT /accessibility` - Update config (Admin)

### **Blog**
- `GET /blog` - Get all blog posts (Public)
- `GET /blog/:slug` - Get blog post by slug (Public)
- `POST /admin/blog` - Create blog post (Admin/Editor/Author)
- `PUT /admin/blog/:id` - Update blog post (Admin/Editor/Author)
- `DELETE /admin/blog/:id` - Delete blog post (Admin)

### **Careers**
- `GET /careers` - Get all open positions (Public)
- `GET /careers/:id` - Get career by ID (Public)
- `POST /careers` - Create job posting (Admin)
- `PUT /careers/:id` - Update job posting (Admin)
- `DELETE /careers/:id` - Delete job posting (Admin)

### **Applicants**
- `POST /careers/:careerId/apply` - Apply for job (Public)
- `GET /admin/applicants` - Get all applicants (Admin)
- `GET /admin/applicants/:id` - Get applicant by ID (Admin)
- `DELETE /admin/applicants/:id` - Delete applicant (Admin)

### **Team**
- `GET /team` - Get all team members (Public)
- `POST /team` - Create team member (Admin)
- `PUT /team/:id` - Update team member (Admin)
- `DELETE /team/:id` - Delete team member (Admin)

### **Contact**
- `POST /contact` - Submit contact form (Public)
- `GET /admin/contact-submissions` - Get all submissions (Admin)
- `DELETE /admin/contact-submissions/:id` - Delete submission (Admin)

### **Media**
- `GET /media` - Get all media files (Admin/Editor/Author)
- `POST /media/upload` - Upload file (Admin/Editor/Author)
- `DELETE /media/:id` - Delete media file (Admin)

---

## 🔐 Authentication & Authorization

### User Roles (RBAC)

1. **SUPER_ADMIN** - Full system access
2. **ADMIN** - Administrative access
3. **EDITOR** - Content editing access
4. **AUTHOR** - Blog post creation
5. **VIEWER** - Read-only access

### JWT Authentication

The API uses JWT tokens for authentication:

1. **Access Token** (15 minutes) - Used for API requests
2. **Refresh Token** (7 days) - Used to obtain new access tokens

### Using Protected Endpoints

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

### Example Login Flow

1. Login: `POST /auth/login`
2. Receive `accessToken` and `refreshToken`
3. Use `accessToken` for API requests
4. When expired, use `refreshToken` to get new tokens: `POST /auth/refresh`

---

## 📤 File Uploads

### Supported File Types

- **Images**: JPEG, PNG, GIF, WebP
- **Documents**: PDF
- **Videos**: MP4

### File Size Limits

Default: 5MB (configurable via `MAX_FILE_SIZE` env variable)

### Accessibility Requirements

**Images MUST include alt text for accessibility compliance.**

The system will reject image uploads without alt text.

---

## 📧 Email Notifications

The system sends email notifications for:

- Contact form submissions

Configure SMTP settings in `.env`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@soothe.com"
```

### Gmail Setup

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `SMTP_PASSWORD`

---

## 🧪 Testing

### Run unit tests

```bash
npm run test
```

### Run e2e tests

```bash
npm run test:e2e
```

### Test coverage

```bash
npm run test:cov
```

---

## 🚢 Deployment

### Using Docker

See `DEPLOYMENT.md` for detailed Docker deployment instructions.

### Using PM2 (Node.js Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start dist/main.js --name soothe-cms

# View logs
pm2 logs soothe-cms

# Restart
pm2 restart soothe-cms
```

### Environment Variables (Production)

Ensure you set secure values for:
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `DATABASE_URL`
- All SMTP credentials

---

## 📊 Default Credentials

After running `npm run prisma:seed`:

**Email**: `admin@soothe.com`  
**Password**: `Admin@123`

⚠️ **IMPORTANT**: Change the default password immediately in production!

---

## 🔒 Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Helmet.js for HTTP headers security
- ✅ CORS configuration
- ✅ Rate limiting on sensitive endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (Prisma ORM)
- ✅ File type validation
- ✅ File size limits

---

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U username -d soothe_cms
```

### Port Already in Use

Change the `PORT` in `.env` file or kill the process:

```bash
# Find process on port 3000
lsof -ti:3000

# Kill process
kill -9 <PID>
```

### Prisma Issues

```bash
# Reset Prisma
npm run prisma:generate
npx prisma migrate reset
```

---

## 📝 License

MIT License - SOOTHE TECHNOLOGIES LIMITED

---

## 👥 Support

For support, email: support@soothe.com

---

## 🎉 Acknowledgments

Built with ❤️ by the SOOTHE development team.

---

**Happy Coding! 🚀**
