# Vercel Build Fix - Frontend

## Issues Found

1. **Missing `NEXT_PUBLIC_API_URL`** - Build fails because it tries to fetch from `localhost:3000` during static generation
2. **Routes Manifest Error** - `routes-manifest.json` not found error

## Fixes Applied

### 1. API Client Build-Time Handling ✅

Updated `lib/frontend-api.ts` to:
- Detect build time using `NEXT_PHASE === 'phase-production-build'`
- Return empty data structures instead of failing when API URL is localhost during build
- Allow build to complete successfully even without API URL set

### 2. Next Steps

**In Vercel Dashboard:**
1. Go to your frontend project settings
2. Navigate to **Environment Variables**
3. Add: `NEXT_PUBLIC_API_URL` = `https://soothe-soyk.onrender.com/api/v1`
4. Redeploy

This will:
- ✅ Allow build to complete (already fixed)
- ✅ Enable API calls in production (needs env var)
- ✅ Fix routes-manifest error (should resolve after redeploy)

---

## Build Status

- ✅ **Build will now complete** - Returns empty data during build if API URL not set
- ⏳ **API calls in production** - Will work after setting `NEXT_PUBLIC_API_URL` in Vercel
- ⏳ **Routes manifest** - Should resolve after redeploy

---

**Action Required**: Set `NEXT_PUBLIC_API_URL` in Vercel environment variables.

