# 🔧 Quick Fix: 401 Authentication Errors

## The Problem
You're getting 401 errors when trying to create items because **the production database hasn't been seeded** with the admin user.

## The Solution (5 Minutes)

### Option 1: Seed Database on Render.com (Recommended)

1. **Go to Render.com Dashboard**
   - Navigate to your backend service
   - Click on **"Shell"** tab (or use SSH)

2. **Run these commands:**
   ```bash
   cd backend
   npm run prisma:seed
   ```

3. **Verify it worked:**
   ```bash
   # Test login via API
   curl -X POST https://soothe-soyk.onrender.com/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@soothe.com","password":"Admin@123"}'
   ```
   
   Should return tokens, not 401.

### Option 2: Use Test Script (Quick Verification)

1. **Open the test file:**
   - Open `admin-panel/test-auth.html` in your browser
   - Or host it on a local server

2. **Run the tests:**
   - Click "Test Login" - should return 200 with tokens
   - Click "Check Tokens" - should show tokens stored
   - Click "Test API Call" - should return 200
   - Click "Test Create Page" - should return 201

3. **If login fails:**
   - Database is NOT seeded → Run Option 1
   - Backend is down → Check Render.com status
   - CORS error → Check backend CORS config

### Option 3: Create User Manually (If Seed Fails)

If seeding doesn't work, create the user via API:

```bash
curl -X POST https://soothe-soyk.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@soothe.com",
    "password": "Admin@123",
    "firstName": "Super",
    "lastName": "Admin",
    "role": "SUPER_ADMIN"
  }'
```

---

## After Fixing: Test in Admin Panel

1. **Clear browser storage:**
   ```javascript
   // In browser console (F12)
   localStorage.clear()
   ```

2. **Login:**
   - Go to: https://soothe-admin.vercel.app/auth/login
   - Email: `admin@soothe.com`
   - Password: `Admin@123`
   - Click "Sign In"

3. **Verify tokens:**
   ```javascript
   // In browser console
   console.log('Token:', localStorage.getItem('accessToken') ? '✅' : '❌')
   ```

4. **Test creating a page:**
   - Go to `/pages/create`
   - Fill form and submit
   - Check Network tab → Should see **201 Created** (not 401)

---

## Common Issues

### "Invalid credentials" on login
→ Database not seeded. Run `npm run prisma:seed` on Render.com

### 401 when creating (but login worked)
→ Token expired or not sent. Clear storage and login again.

### CORS errors
→ Check backend CORS config allows `https://soothe-admin.vercel.app`

---

## Verification Checklist

- [ ] Database seeded on Render.com
- [ ] Login API returns 200 (test with curl)
- [ ] Admin panel login works
- [ ] Tokens visible in localStorage
- [ ] Creating items returns 201 (not 401)

---

**Next Step**: Run `npm run prisma:seed` on Render.com backend, then test login again.


