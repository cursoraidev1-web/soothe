# ✅ SOOTHE CMS Backend - Installation Checklist

Use this checklist to verify your installation is complete and working correctly.

---

## 📦 Pre-Installation Requirements

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] PostgreSQL 14+ installed (`psql --version`)
- [ ] PostgreSQL running (`sudo systemctl status postgresql` or `brew services list`)
- [ ] Git installed (if cloning from repository)

---

## 🔧 Installation Steps

### 1. Project Setup
- [ ] Navigate to backend directory: `cd backend`
- [ ] Install dependencies: `npm install`
- [ ] Verify package.json exists with all dependencies

### 2. Environment Configuration
- [ ] Copy `.env.example` to `.env`: `cp .env.example .env`
- [ ] Update `DATABASE_URL` in `.env`
- [ ] Set secure `JWT_SECRET` (generate with `openssl rand -base64 32`)
- [ ] Set secure `JWT_REFRESH_SECRET`
- [ ] Configure SMTP settings (if using email notifications)
- [ ] Update `CORS_ORIGIN` for your frontend domain

### 3. Database Setup
- [ ] Create PostgreSQL database: `createdb soothe_cms`
- [ ] Generate Prisma Client: `npm run prisma:generate`
- [ ] Run migrations: `npm run prisma:migrate`
- [ ] Seed database: `npm run prisma:seed`
- [ ] Verify seed completed successfully (check for "Database seeding completed" message)

### 4. Start Application
- [ ] Start in development mode: `npm run start:dev`
- [ ] Server starts without errors
- [ ] See "SOOTHE CMS Backend is running!" message
- [ ] Note the server URL and API Docs URL

---

## ✅ Verification Tests

### 1. Health Check
- [ ] Open browser to: `http://localhost:3000/api/v1/settings`
- [ ] Should see JSON response with settings data
- [ ] Status code: 200 OK

### 2. Swagger Documentation
- [ ] Open: `http://localhost:3000/api/docs`
- [ ] Swagger UI loads successfully
- [ ] Can see all API endpoints organized by tags
- [ ] Can expand and view endpoint details

### 3. Authentication Test
Run this curl command:
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@soothe.com", "password": "Admin@123"}'
```

- [ ] Response includes `accessToken`
- [ ] Response includes `refreshToken`
- [ ] Response includes user object
- [ ] Status code: 200 OK

### 4. Protected Endpoint Test
Using the access token from step 3:
```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

- [ ] Returns current user profile
- [ ] Status code: 200 OK

### 5. Public Endpoints Test
- [ ] `GET /api/v1/settings` - Returns settings
- [ ] `GET /api/v1/pages` - Returns pages (may be empty)
- [ ] `GET /api/v1/solutions` - Returns solutions
- [ ] `GET /api/v1/blog` - Returns blog posts
- [ ] `GET /api/v1/careers` - Returns careers
- [ ] `GET /api/v1/team` - Returns team members

---

## 🗄️ Database Verification

### Using Prisma Studio
- [ ] Run: `npm run prisma:studio`
- [ ] Studio opens in browser (usually `http://localhost:5555`)
- [ ] Can see all tables:
  - users
  - settings
  - pages
  - solution_categories
  - solutions
  - accessibility
  - blog_posts
  - careers
  - applicants
  - team
  - contact_submissions
  - media
- [ ] Users table has at least one admin user
- [ ] Settings table has one row with default data

### Using psql
```bash
psql -U your_username -d soothe_cms
\dt  # List all tables
SELECT * FROM users;  # Check users
\q  # Quit
```

- [ ] All 12 tables exist
- [ ] Users table has admin user

---

## 📝 File Structure Verification

Check these critical files exist:

### Root Directory
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `nest-cli.json`
- [ ] `.env` (your configuration)
- [ ] `.env.example` (template)
- [ ] `.gitignore`
- [ ] `Dockerfile`
- [ ] `docker-compose.yml`
- [ ] `.dockerignore`

### Documentation
- [ ] `README.md`
- [ ] `QUICKSTART.md`
- [ ] `DEPLOYMENT.md`
- [ ] `PROJECT_SUMMARY.md`
- [ ] `POSTMAN_COLLECTION.json`

### Prisma
- [ ] `prisma/schema.prisma`
- [ ] `prisma/seed.ts`

### Source Code (`src/`)
- [ ] `main.ts`
- [ ] `app.module.ts`
- [ ] `auth/` directory (11 files)
- [ ] `users/` directory (5 files)
- [ ] `settings/` directory (4 files)
- [ ] `pages/` directory (5 files)
- [ ] `solutions/` directory (9 files)
- [ ] `accessibility/` directory (4 files)
- [ ] `blog/` directory (5 files)
- [ ] `careers/` directory (5 files)
- [ ] `applicants/` directory (4 files)
- [ ] `team/` directory (5 files)
- [ ] `contact/` directory (5 files)
- [ ] `media/` directory (4 files)
- [ ] `prisma/` directory (2 files)

---

## 🔒 Security Verification

- [ ] Changed default admin password from `Admin@123`
- [ ] Set unique JWT secrets (not the defaults from .env.example)
- [ ] Configured CORS_ORIGIN for your domain
- [ ] SMTP credentials are secure
- [ ] `.env` file is in `.gitignore`

---

## 🐳 Docker Verification (Optional)

If using Docker:

### Build & Run
- [ ] Run: `docker-compose up -d`
- [ ] All containers start successfully:
  - `soothe_postgres`
  - `soothe_backend`
- [ ] No error messages in logs: `docker-compose logs`

### Migrations
- [ ] Run: `docker-compose exec backend npx prisma migrate deploy`
- [ ] Migrations complete successfully

### Seed
- [ ] Run: `docker-compose exec backend npx prisma db seed`
- [ ] Seeding completes successfully

### Access
- [ ] API accessible at: `http://localhost:3000/api/v1`
- [ ] Swagger docs at: `http://localhost:3000/api/docs`

---

## 📊 Postman Collection Test (Optional)

- [ ] Import `POSTMAN_COLLECTION.json` into Postman
- [ ] Set `baseUrl` variable to `http://localhost:3000/api/v1`
- [ ] Run "Login" request
- [ ] Access token automatically saved to collection variables
- [ ] Other authenticated requests work with saved token

---

## 🚀 Production Readiness (Before Deploying)

- [ ] All tests pass
- [ ] Environment variables are production-ready
- [ ] Database backups configured
- [ ] SSL/HTTPS configured
- [ ] Domain name configured
- [ ] Email notifications tested
- [ ] File upload directory has correct permissions
- [ ] Logs directory exists and is writable
- [ ] Rate limiting is enabled
- [ ] CORS is properly configured
- [ ] Read DEPLOYMENT.md thoroughly

---

## ⚠️ Common Issues & Solutions

### Issue: Database connection failed
**Solution**: 
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

### Issue: Port 3000 already in use
**Solution**:
- Change PORT in .env
- Or kill process: `lsof -ti:3000 | xargs kill -9`

### Issue: Prisma Client not generated
**Solution**: 
- Run: `npm run prisma:generate`

### Issue: Migration failed
**Solution**: 
- Drop database and recreate: `dropdb soothe_cms && createdb soothe_cms`
- Run migrations again: `npm run prisma:migrate`

### Issue: Cannot login
**Solution**:
- Verify database was seeded
- Check user exists: `npm run prisma:studio`
- Ensure correct email/password

### Issue: Module not found errors
**Solution**:
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

### Issue: File upload fails
**Solution**:
- Create uploads directory: `mkdir -p uploads/media uploads/cvs`
- Check permissions: `chmod -R 755 uploads/`

---

## 📞 Support

If you encounter issues:

1. Check the error logs: `tail -f logs/combined.log`
2. Review console output
3. Consult README.md for detailed documentation
4. Check DEPLOYMENT.md for production issues

---

## ✅ Installation Complete!

If all items above are checked, your installation is complete and verified!

### Next Steps:

1. **Change Default Password**
   - Login and update admin password immediately

2. **Explore the API**
   - Open Swagger docs: `http://localhost:3000/api/docs`
   - Try different endpoints

3. **Read Documentation**
   - Full guide: `README.md`
   - Quick reference: `QUICKSTART.md`

4. **Prepare for Deployment**
   - When ready: `DEPLOYMENT.md`

---

**🎉 Congratulations! Your SOOTHE CMS Backend is ready to use!**
