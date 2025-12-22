# Authentication Fix Guide - 401 Errors

## Problem
Getting 401 Unauthorized errors when trying to create items in the admin panel.

## Root Cause
The production database on Render.com likely hasn't been seeded with the default admin user.

## Solution

### Step 1: Verify Backend Database is Seeded

**On Render.com Dashboard:**
1. Go to your backend service
2. Open the **Shell** tab (or use SSH)
3. Run these commands:

```bash
# Navigate to backend directory
cd backend

# Run database migrations (if not done)
npm run prisma:migrate

# Seed the database with default admin user
npm run prisma:seed
```

**Expected Output:**
```
🌱 Starting database seeding...
✅ Super Admin created: admin@soothe.com
✅ Default settings created
✅ Accessibility configuration created
✅ Solution categories created: 3
✅ Sample solution created
✅ Sample blog post created
✅ Sample team member created
🎉 Database seeding completed successfully!

📝 Default credentials:
   Email: admin@soothe.com
   Password: Admin@123
```

### Step 2: Test Login via API

**Option A: Using curl (in Render Shell)**
```bash
curl -X POST https://soothe-soyk.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@soothe.com",
    "password": "Admin@123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "email": "admin@soothe.com",
    "firstName": "Super",
    "lastName": "Admin",
    "role": "SUPER_ADMIN"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**If you get 401:**
- Database is NOT seeded → Run `npm run prisma:seed`
- User exists but password wrong → Check seed.ts password hash
- User is inactive → Check `isActive: true` in database

### Step 3: Test Login in Admin Panel

1. Go to: https://soothe-admin.vercel.app/auth/login
2. Enter credentials:
   - Email: `admin@soothe.com`
   - Password: `Admin@123`
3. Click "Sign In"
4. **Check Network Tab** (F12 → Network):
   - Should see `POST /api/v1/auth/login` → **200 OK**
   - Should see `accessToken` and `refreshToken` in response
   - Should see tokens stored in localStorage

### Step 4: Verify Token Storage

**In Browser Console (F12):**
```javascript
// Check if tokens are stored
localStorage.getItem('accessToken')  // Should return a JWT token
localStorage.getItem('refreshToken') // Should return a JWT token
localStorage.getItem('user')         // Should return user object
```

### Step 5: Test Creating Items

After successful login:
1. Navigate to any create page (e.g., `/pages/create`)
2. Fill out the form
3. Submit
4. **Check Network Tab**:
   - Should see `POST /api/v1/admin/pages` → **201 Created**
   - Should see `Authorization: Bearer <token>` in request headers

---

## Troubleshooting

### Issue: Login returns 401 "Invalid credentials"

**Possible Causes:**
1. Database not seeded
2. User doesn't exist
3. Password hash mismatch
4. User is inactive

**Fix:**
```bash
# On Render.com, run:
cd backend
npm run prisma:seed
```

### Issue: 401 when creating items (but login works)

**Possible Causes:**
1. Token not being sent in request
2. Token expired
3. Token invalid

**Fix:**
1. Check browser console for errors
2. Clear localStorage and login again:
   ```javascript
   localStorage.clear()
   // Then login again
   ```
3. Check Network tab - verify `Authorization: Bearer <token>` header is present

### Issue: Token refresh fails

**Possible Causes:**
1. Refresh token expired
2. Refresh token not stored correctly
3. Backend refresh endpoint issue

**Fix:**
1. Logout and login again
2. Check `localStorage.getItem('refreshToken')` exists
3. Verify backend `/auth/refresh` endpoint works

---

## Quick Test Script

Run this in browser console after logging in:

```javascript
// Test 1: Check tokens
console.log('Access Token:', localStorage.getItem('accessToken') ? '✅ Exists' : '❌ Missing')
console.log('Refresh Token:', localStorage.getItem('refreshToken') ? '✅ Exists' : '❌ Missing')
console.log('User:', localStorage.getItem('user') ? '✅ Exists' : '❌ Missing')

// Test 2: Test API call
fetch('https://soothe-soyk.onrender.com/api/v1/pages', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
})
.then(r => r.json())
.then(data => console.log('API Test:', r.status === 200 ? '✅ Success' : '❌ Failed', data))
.catch(e => console.error('API Error:', e))
```

---

## Verification Checklist

- [ ] Database seeded on Render.com
- [ ] Login API returns 200 with tokens
- [ ] Admin panel login works
- [ ] Tokens stored in localStorage
- [ ] API requests include `Authorization` header
- [ ] Creating items returns 201 (not 401)

---

**Status**: Waiting for database seeding on Render.com  
**Action Required**: Run `npm run prisma:seed` on Render.com backend


