# ⚡ SOOTHE CMS - Full Stack Quick Start

**Get both Backend + Admin Panel running in 10 minutes!**

---

## 📋 Prerequisites

- ✅ Node.js 18+ installed
- ✅ PostgreSQL 14+ installed and running
- ✅ npm or yarn
- ✅ Two terminal windows

---

## 🚀 Step 1: Start Backend API (5 minutes)

### Terminal 1 - Backend

```bash
# 1. Navigate to backend
cd /workspace/backend

# 2. Install dependencies (first time only)
npm install

# 3. Create environment file
cp .env.example .env

# 4. Create PostgreSQL database
createdb soothe_cms

# 5. Setup database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 6. Start backend server
npm run start:dev
```

**✅ Backend running at:** http://localhost:3000

**✅ API Docs at:** http://localhost:3000/api/docs

---

## 🎨 Step 2: Start Admin Panel (5 minutes)

### Terminal 2 - Admin Panel

```bash
# 1. Navigate to admin panel
cd /workspace/admin-panel

# 2. Install dependencies (first time only)
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Start admin panel
npm run dev
```

**✅ Admin Panel running at:** http://localhost:3001

---

## 🔑 Step 3: Login

1. Open http://localhost:3001 in your browser
2. You'll be redirected to the login page
3. Enter default credentials:
   - **Email**: `admin@soothe.com`
   - **Password**: `Admin@123`
4. Click "Sign In"
5. You'll be redirected to the dashboard!

---

## ✅ Verify Everything Works

### Test Backend

```bash
# Test settings endpoint
curl http://localhost:3000/api/v1/settings

# Should return JSON with site settings
```

### Test Admin Panel

1. Login successful ✅
2. Can access dashboard ✅
3. Dark mode toggle works ✅

---

## 📝 Quick Reference

### Backend Commands

```bash
cd /workspace/backend

# Development
npm run start:dev              # Start with hot-reload

# Database
npm run prisma:studio          # Open database GUI
npm run prisma:migrate         # Run migrations
npm run prisma:seed            # Seed sample data

# Build
npm run build                  # Build for production
npm run start:prod             # Start production server
```

### Admin Panel Commands

```bash
cd /workspace/admin-panel

# Development
npm run dev                    # Start dev server

# Build
npm run build                  # Build for production
npm start                      # Start production server

# Type checking
npm run type-check            # Check TypeScript types
```

---

## 🛠️ Troubleshooting

### Backend won't start?

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list                # macOS

# Check port 3000 is available
lsof -ti:3000

# If port is in use, kill process
kill -9 $(lsof -ti:3000)
```

### Database connection error?

```bash
# Update .env file
# Make sure DATABASE_URL is correct:
DATABASE_URL="postgresql://username:password@localhost:5432/soothe_cms"

# Recreate database if needed
dropdb soothe_cms
createdb soothe_cms
npm run prisma:migrate
npm run prisma:seed
```

### Admin Panel won't connect to API?

```bash
# Check backend is running
curl http://localhost:3000/api/v1/settings

# Check .env.local in admin-panel
cat .env.local
# Should have: NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### Login not working?

```bash
# Reset database and reseed
cd /workspace/backend
npm run prisma:migrate reset
npm run prisma:seed

# Try login again with:
# Email: admin@soothe.com
# Password: Admin@123
```

---

## 🎯 What's Next?

### 1. Explore the Backend

- **API Docs**: http://localhost:3000/api/docs
- Test endpoints with Swagger UI
- Check `/workspace/backend/README.md`

### 2. Build Admin Panel UI

- Follow `/workspace/admin-panel/IMPLEMENTATION_GUIDE.md`
- Build CRUD pages for each module
- ~40-50 hours to complete all modules

### 3. Customize

- Update branding colors
- Add your logo
- Customize forms
- Add business logic

---

## 📚 Documentation

### Backend
- **Full Docs**: `/workspace/backend/README.md`
- **Deployment**: `/workspace/backend/DEPLOYMENT.md`
- **API Reference**: http://localhost:3000/api/docs

### Admin Panel
- **Setup Guide**: `/workspace/admin-panel/README.md`
- **Implementation**: `/workspace/admin-panel/IMPLEMENTATION_GUIDE.md`

### Full Stack
- **Overview**: `/workspace/COMPLETE_PROJECT_SUMMARY.md`

---

## 🔑 Default Credentials

After seeding, you can login with:

- **Super Admin**
  - Email: `admin@soothe.com`
  - Password: `Admin@123`

⚠️ **IMPORTANT**: Change this password immediately after first login!

---

## 🎨 Quick Feature Test

Once logged in, try these:

1. **View Swagger Docs** → http://localhost:3000/api/docs
2. **Open Prisma Studio** → `cd backend && npm run prisma:studio`
3. **Test an API endpoint**:
   ```bash
   # Get your auth token from login response, then:
   curl http://localhost:3000/api/v1/auth/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

---

## 🚀 Running with Docker (Alternative)

### Backend with Docker

```bash
cd /workspace/backend
docker-compose up -d
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma db seed
```

**Backend at:** http://localhost:3000

---

## 📊 What You Have Now

✅ **Backend API**
- 60+ endpoints running
- 12 modules complete
- JWT authentication working
- Database seeded with sample data
- Swagger docs available

✅ **Admin Panel**
- Login page functional
- Authentication flow working
- API integration ready
- Dark mode working
- Components library ready

🚧 **To Build**
- Dashboard UI
- 11 CRUD modules (follow implementation guide)

---

## 🎉 Success!

You now have:

- ✅ Backend API running on port 3000
- ✅ Admin Panel running on port 3001
- ✅ Database connected and seeded
- ✅ Authentication working
- ✅ Documentation accessible

**Ready to start building! 🚀**

---

## 🆘 Need Help?

1. **Check logs**:
   ```bash
   # Backend logs
   cd /workspace/backend
   tail -f logs/combined.log
   
   # Admin panel console
   # Check browser DevTools → Console
   ```

2. **Reset everything**:
   ```bash
   # Backend
   cd /workspace/backend
   dropdb soothe_cms
   createdb soothe_cms
   npm run prisma:migrate
   npm run prisma:seed
   npm run start:dev
   
   # Admin Panel (in new terminal)
   cd /workspace/admin-panel
   rm -rf .next
   npm run dev
   ```

3. **Check documentation**:
   - Backend README: `/workspace/backend/README.md`
   - Admin README: `/workspace/admin-panel/README.md`
   - Full Summary: `/workspace/COMPLETE_PROJECT_SUMMARY.md`

---

**Happy Coding! 🎊**
