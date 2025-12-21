# Vercel Environment Variables Setup

## Problem
The frontend is trying to connect to `http://localhost:3000/api/v1` because `NEXT_PUBLIC_API_URL` is not set in Vercel.

## Solution

### Step 1: Get Your Backend URL
Get your backend API URL from Render.com (or wherever your backend is hosted):
```
https://your-backend.onrender.com/api/v1
```

### Step 2: Set Environment Variable in Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your **frontend project**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend.onrender.com/api/v1` (your actual backend URL)
   - **Environments**: Select all (Production, Preview, Development)
6. Click **Save**

**Option B: Via Vercel CLI**

```bash
# From root directory
cd C:\server\soothebck

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL

# When prompted:
# - Value: https://your-backend.onrender.com/api/v1
# - Environments: Production, Preview, Development (select all)
```

### Step 3: Redeploy

After adding the environment variable, you need to redeploy:

**Via Dashboard:**
1. Go to **Deployments** tab
2. Click **...** on the latest deployment
3. Click **Redeploy**

**Via CLI:**
```bash
vercel --prod
```

### Step 4: Verify

After redeployment, check:
1. Build logs should not show `localhost:3000`
2. Site should connect to your backend API
3. No errors in browser console

## Additional Environment Variables (Optional)

You may also want to set:

- `NEXT_PUBLIC_SITE_URL` - Your frontend URL (e.g., `https://your-site.vercel.app`)
- `NEXT_PUBLIC_SITE_NAME` - Site name (e.g., `SOOTHE Technologies`)

## Troubleshooting

### Still seeing localhost in logs?
- Make sure you redeployed after adding the variable
- Check that the variable name is exactly `NEXT_PUBLIC_API_URL` (case-sensitive)
- Verify the variable is set for the correct environment (Production/Preview/Development)

### API connection errors?
- Verify your backend URL is correct and accessible
- Check CORS settings on your backend
- Make sure backend is running and accessible

---

**Last Updated**: December 2025


