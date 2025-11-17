# 🔌 Backend Connection Troubleshooting Guide

## Issue: Blog Post Returns 404 Error

If you're seeing:
```json
{"message":"Blog post not found","error":"Not Found","statusCode":404}
```

But the blog post exists in the database, follow these steps:

---

## ✅ Step 1: Verify Backend is Running

```bash
cd backend
npm run start:dev
```

**Expected output:**
```
Nest application successfully started
Listening on port 3000
```

**Test the backend directly:**
```bash
# Test if backend is responding
curl http://localhost:3000/api/v1/blog

# Test specific blog post
curl http://localhost:3000/api/v1/blog/future-of-cloud-computing
```

---

## ✅ Step 2: Check Frontend Environment Variables

**File: `/workspace/.env`** (create if missing)

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# For production, use your actual backend URL
# NEXT_PUBLIC_API_URL=https://your-backend.com/api/v1
```

**After creating/updating .env:**
```bash
# Restart Next.js
cd /workspace
npm run dev
```

---

## ✅ Step 3: Verify Database Has Data

```bash
cd backend

# Connect to database
npx prisma studio
# Opens UI at http://localhost:5555

# Or query directly
npx prisma db seed  # Re-seed if needed
```

**Check blog post status:**
- Open Prisma Studio
- Go to "BlogPost" table
- Verify:
  - ✅ `slug` = "future-of-cloud-computing"
  - ✅ `status` = "PUBLISHED"
  - ✅ Post exists

---

## ✅ Step 4: Test API Endpoint

**Using curl:**
```bash
# Get all blog posts
curl http://localhost:3000/api/v1/blog

# Get specific post by slug
curl http://localhost:3000/api/v1/blog/future-of-cloud-computing

# Expected: 200 OK with blog post data
# Not: 404 Not Found
```

**Using browser:**
1. Open: `http://localhost:3000/api/v1/blog`
2. Should see paginated blog posts
3. Copy a slug from the results
4. Visit: `http://localhost:3000/api/v1/blog/[that-slug]`
5. Should see single blog post

---

## ✅ Step 5: Check Backend Logs

```bash
cd backend
npm run start:dev

# Watch logs for errors when accessing:
# http://localhost:3001/blog/future-of-cloud-computing
```

**Look for:**
- ❌ Database connection errors
- ❌ Prisma query errors
- ❌ "Blog post not found" exceptions
- ✅ Successful queries

---

## ✅ Step 6: Check CORS Settings

If backend is running on different domain/port:

**File: `backend/src/main.ts`**
```typescript
app.enableCors({
  origin: [
    'http://localhost:3001', // Frontend dev
    'http://localhost:3002', // Admin dev
    // Add your production URLs
  ],
  credentials: true,
});
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to fetch"
**Cause:** Backend not running  
**Fix:** `cd backend && npm run start:dev`

### Issue 2: "CORS error"
**Cause:** Frontend URL not allowed  
**Fix:** Add frontend URL to CORS origins in `main.ts`

### Issue 3: "404 Not Found"
**Possible causes:**
1. Blog post doesn't exist in database
2. Blog post status is DRAFT, not PUBLISHED
3. Wrong slug format (spaces, special chars)
4. Backend route not registered

**Fix:**
```bash
# Check database
cd backend
npx prisma studio

# Verify post exists and is PUBLISHED
# Verify slug matches exactly
```

### Issue 4: "Connection refused"
**Cause:** Backend not running or wrong port  
**Fix:**
```bash
# Check backend is on port 3000
cd backend
npm run start:dev

# Check .env
echo $DATABASE_URL
```

---

## 🔍 Debug Mode (Frontend)

The frontend now has debug mode for development:

**When a blog post fails to load, you'll see:**
- ✅ Exact error message
- ✅ Which slug was requested
- ✅ Troubleshooting checklist
- ✅ Link back to blog list

**To test:**
```bash
cd /workspace
NODE_ENV=development npm run dev

# Visit a non-existent slug
# You'll see detailed error page
```

---

## 📝 Complete Test Sequence

```bash
# 1. Start backend
cd backend
npm run start:dev
# Wait for "Listening on port 3000"

# 2. Test backend directly
curl http://localhost:3000/api/v1/blog
# Should return blog posts

# 3. Set environment variable
cd /workspace
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1" > .env

# 4. Start frontend
npm run dev
# Opens on http://localhost:3001

# 5. Test frontend
# Visit: http://localhost:3001/blog
# Click on a blog post
# Should load successfully
```

---

## 🎯 Quick Fix Checklist

- [ ] Backend is running (`npm run start:dev` in backend folder)
- [ ] Backend is accessible (`curl http://localhost:3000/api/v1/blog`)
- [ ] Frontend `.env` has `NEXT_PUBLIC_API_URL` set
- [ ] Blog post exists in database (check Prisma Studio)
- [ ] Blog post status is "PUBLISHED"
- [ ] Slug in URL matches slug in database exactly
- [ ] No CORS errors in browser console
- [ ] Frontend restarted after .env changes

---

## 💡 Still Not Working?

1. **Check browser console** (F12) for errors
2. **Check backend terminal** for errors
3. **Check Network tab** in DevTools - see actual API calls
4. **Try a different browser** - rule out caching
5. **Clear Next.js cache**: `rm -rf .next && npm run dev`

---

## 📞 Need Help?

**Check these files:**
- Backend: `/workspace/backend/src/blog/blog.controller.ts`
- Backend: `/workspace/backend/src/blog/blog.service.ts`
- Frontend: `/workspace/lib/frontend-api.ts`
- Frontend: `/workspace/app/blog/[slug]/page.tsx`

**Useful commands:**
```bash
# Backend logs
cd backend && npm run start:dev

# Database UI
cd backend && npx prisma studio

# Frontend logs
cd /workspace && npm run dev

# Test API
curl -v http://localhost:3000/api/v1/blog/[slug]
```

---

**Last Updated:** November 17, 2025  
**Status:** Troubleshooting Guide  
**For:** Blog Post 404 Issues
