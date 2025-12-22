# Vercel Build Error Fix - Routes Manifest

## Problem
Error: `The file "/vercel/path0/app/.next/routes-manifest.json" couldn't be found.`

## Analysis
- ✅ Build completes successfully (all 14 pages generated)
- ✅ No TypeScript errors
- ✅ Build output is correct (`.next/` directory created)
- ❌ Vercel can't find routes-manifest.json during "Collecting build traces" step

## Root Cause
Vercel is looking in the wrong path: `/vercel/path0/app/.next/` instead of `/vercel/path0/.next/`

This suggests:
1. **Root Directory** setting in Vercel might be incorrect
2. OR Vercel is confused about the project structure

## Solution

### Option 1: Fix Root Directory in Vercel Dashboard (Recommended)

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your **frontend project** (not admin-panel)
3. Go to **Settings** → **General**
4. Find **Root Directory** setting
5. **IMPORTANT**: Set it to `.` (root) or **leave it EMPTY**
6. **DO NOT** set it to `app` or any subdirectory
7. Click **Save**
8. **Redeploy**

### Option 2: Verify Project Structure

Your project structure should be:
```
soothebck/                    ← Root (where package.json is)
├── app/                       ← Next.js app directory
├── components/                ← Components
├── lib/                       ← Utilities
├── package.json               ← Main package.json
├── next.config.js             ← Next.js config
└── .next/                     ← Build output (created during build)
```

**Vercel should build from the root directory**, not from `app/`.

### Option 3: Check for Conflicting Configurations

Make sure:
- ✅ No `vercel.json` in root (we removed it)
- ✅ `next.config.js` is in root
- ✅ `package.json` is in root
- ✅ Root Directory in Vercel is `.` or empty

### Option 4: Force Clean Build

If the issue persists:

1. In Vercel Dashboard → Settings → General
2. Click **Clear Build Cache**
3. Redeploy

## API Connection Errors (Expected)

The API connection errors during build are **EXPECTED** and **NOT A PROBLEM**:

```
[Frontend API] Failed: http://localhost:3000/api/v1/careers
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Why this is OK:**
- The backend isn't running during Vercel's build process
- Pages handle this gracefully with `.catch(() => [])`
- Build completes successfully despite these errors
- Pages will work at runtime when `NEXT_PUBLIC_API_URL` is set

**To fix the warnings:**
1. Set `NEXT_PUBLIC_API_URL` environment variable in Vercel
2. This will remove the warnings (but errors are still expected during build)

## Verification

After fixing Root Directory:

1. **Check Build Logs**:
   - Should show: "Generating static pages (14/14)"
   - Should show: "Finalizing page optimization..."
   - Should NOT show: "routes-manifest.json couldn't be found"

2. **Check Deployment**:
   - Deployment should succeed
   - Site should be accessible

3. **Test Pages**:
   - Homepage should load
   - All routes should work

## If Issue Persists

1. **Check Vercel Project Settings**:
   - Framework: Should be "Next.js" (auto-detected)
   - Root Directory: Should be `.` or empty
   - Build Command: Should be `npm run build` (auto-detected)
   - Output Directory: Should be `.next` (auto-detected)

2. **Try Creating New Project**:
   - Delete current project
   - Create new project from same repo
   - **IMPORTANT**: When asked for Root Directory, select **"." (root)** or leave empty
   - Do NOT select `app` or any subdirectory

3. **Contact Vercel Support**:
   - If issue persists after all fixes
   - Provide build logs and project structure

---

## Quick Checklist

- [ ] Root Directory in Vercel = `.` or empty
- [ ] No `vercel.json` in root directory
- [ ] `package.json` is in root
- [ ] `next.config.js` is in root
- [ ] Build completes successfully (14 pages)
- [ ] `NEXT_PUBLIC_API_URL` is set in Vercel (for runtime)

---

**Status**: Build is successful, but Vercel configuration needs adjustment  
**Action**: Fix Root Directory setting in Vercel Dashboard


