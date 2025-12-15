# Admin Panel Deployment Guide

Complete guide for deploying the SOOTHE CMS Admin Panel to production.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Option 1: Vercel Deployment (Recommended)](#option-1-vercel-deployment-recommended)
5. [Option 2: Netlify Deployment](#option-2-netlify-deployment)
6. [Option 3: AWS S3 + CloudFront](#option-3-aws-s3--cloudfront)
7. [Connecting to Lambda Backend](#connecting-to-lambda-backend)
8. [Authentication Setup](#authentication-setup)
9. [Custom Domain Setup](#custom-domain-setup)
10. [Post-Deployment Verification](#post-deployment-verification)
11. [Troubleshooting](#troubleshooting)

---

## Overview

The admin panel is a Next.js 14 application that provides the CMS dashboard for managing content. It requires authentication and connects to your AWS Lambda backend API.

**Recommended**: Vercel (easiest, free tier available, automatic deployments)

---

## Prerequisites

- ✅ Lambda backend deployed and API Gateway URL available
- ✅ Admin user created in database (from backend seed)
- ✅ Git repository with your code
- ✅ Node.js 18+ installed locally (for testing)
- ✅ Domain name (optional, for custom domain)

---

## Environment Variables

Create a `.env.local` file in the `admin-panel` directory:

```env
# Backend API URL (from Lambda API Gateway)
NEXT_PUBLIC_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1

# Site Configuration (optional)
NEXT_PUBLIC_SITE_NAME=SOOTHE CMS Admin
NEXT_PUBLIC_SITE_URL=https://admin.yourdomain.com
```

**Important**: 
- Variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- Update `NEXT_PUBLIC_API_URL` with your actual Lambda API Gateway URL
- Don't commit `.env.local` to Git (already in .gitignore)

---

## Option 1: Vercel Deployment (Recommended)

### Why Vercel?

- ✅ Zero configuration for Next.js
- ✅ Automatic deployments from Git
- ✅ Free tier available
- ✅ Built-in CDN and SSL
- ✅ Preview deployments for PRs
- ✅ Easy custom domain setup

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Admin Panel Directory

```bash
# Navigate to admin-panel directory
cd admin-panel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? soothe-admin-panel (or your choice)
# - Directory? ./ (current directory)
# - Override settings? No
```

**Important**: Vercel needs to know this is a Next.js app in a subdirectory. You may need to configure the root directory.

### Step 4: Configure Root Directory (if needed)

If Vercel doesn't detect Next.js automatically:

1. Go to Vercel Dashboard → Your Project → Settings
2. Under "Build & Development Settings"
3. Set **Root Directory** to `admin-panel`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `.next`
6. Set **Install Command** to `npm install`

### Step 5: Set Environment Variables

```bash
# From admin-panel directory
vercel env add NEXT_PUBLIC_API_URL

# Enter value: https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1
# Apply to: Production, Preview, Development (all)

# Set site URL (optional)
vercel env add NEXT_PUBLIC_SITE_URL
# Enter value: https://admin.yourdomain.com
```

Or via Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save

### Step 6: Redeploy

```bash
# Redeploy to apply environment variables
vercel --prod
```

### Step 7: Get Deployment URL

After deployment, you'll get a URL like:
```
https://soothe-admin-panel.vercel.app
```

**Save this URL - you'll need it for CORS configuration in Lambda**

---

## Option 2: Netlify Deployment

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

### Step 3: Create Netlify Configuration

Create `netlify.toml` in `admin-panel` directory:

```toml
[build]
  base = "admin-panel"
  command = "npm run build"
  publish = "admin-panel/.next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

### Step 4: Deploy

```bash
# From root directory
netlify deploy --prod --dir=admin-panel

# Or for preview
netlify deploy --dir=admin-panel
```

### Step 5: Set Environment Variables

Via Netlify Dashboard:
1. Go to Site settings → Environment variables
2. Add:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
3. Redeploy

Or via CLI:

```bash
netlify env:set NEXT_PUBLIC_API_URL "https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1"
netlify env:set NEXT_PUBLIC_SITE_URL "https://admin.yourdomain.com"
```

---

## Option 3: AWS S3 + CloudFront

### Step 1: Build for Static Export

Update `admin-panel/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
```

**Note**: Static export may have limitations with authentication. Consider using Vercel/Netlify instead.

### Step 2: Build the Application

```bash
cd admin-panel
npm run build
```

This creates an `out` directory with static files.

### Step 3: Create S3 Bucket

```bash
aws s3 mb s3://soothe-admin-panel-{your-unique-id} --region us-east-1
```

### Step 4: Upload Files

```bash
aws s3 sync out/ s3://soothe-admin-panel-{your-unique-id} --delete
```

### Step 5: Configure Bucket for Static Website

```bash
aws s3 website s3://soothe-admin-panel-{your-unique-id} \
  --index-document index.html \
  --error-document 404.html
```

### Step 6: Set Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::soothe-admin-panel-{your-unique-id}/*"
    }
  ]
}
```

### Step 7: Create CloudFront Distribution

1. Go to CloudFront → Create distribution
2. Configure:
   - **Origin Domain**: Select your S3 bucket
   - **Origin Access**: Public
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Default Root Object**: `index.html`
3. Create distribution
4. Wait 5-15 minutes for deployment

---

## Connecting to Lambda Backend

### Step 1: Get Lambda API Gateway URL

From your Lambda deployment output:
```
https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1
```

### Step 2: Update Admin Panel Environment Variable

Set `NEXT_PUBLIC_API_URL` to your Lambda API Gateway URL.

### Step 3: Update Lambda CORS

In your Lambda backend, update `CORS_ORIGIN` to include your admin panel domain:

```bash
# Update serverless.yml or redeploy with updated .env
CORS_ORIGIN="https://yourdomain.com,https://admin.yourdomain.com,https://soothe-admin-panel.vercel.app"
```

### Step 4: Verify Connection

Test that admin panel can reach backend:

```bash
# From browser console on your deployed admin panel
fetch('https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1/settings')
  .then(r => r.json())
  .then(console.log)
```

---

## Authentication Setup

### Default Admin Credentials

After seeding the database, you can login with:

- **Email**: `admin@soothe.com`
- **Password**: `Admin@123`

**⚠️ IMPORTANT**: Change this password immediately after first login!

### Step 1: Access Admin Panel

1. Navigate to your deployed admin panel URL
2. You'll be redirected to `/auth/login`
3. Enter default credentials

### Step 2: Change Admin Password

1. Login to admin panel
2. Go to Users section
3. Edit your admin user
4. Change password to a secure one

### Step 3: Verify Authentication Flow

Test the following:
- ✅ Login works
- ✅ Logout works
- ✅ Protected routes redirect to login
- ✅ Token refresh works
- ✅ Session persists on page refresh

---

## Custom Domain Setup

### Vercel

1. Go to Project → Settings → Domains
2. Add your domain (e.g., `admin.yourdomain.com`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS as instructed
4. SSL certificate auto-provisioned

### AWS CloudFront

1. Request SSL certificate in AWS Certificate Manager
2. Add domain to CloudFront distribution
3. Configure DNS to point to CloudFront
4. Wait for SSL provisioning

---

## Post-Deployment Verification

### 1. Test Login Page

Visit your deployed URL and verify:
- ✅ Login page loads
- ✅ Form validation works
- ✅ Error messages display correctly

### 2. Test Authentication

1. Login with admin credentials
2. Verify redirect to dashboard
3. Check that protected routes are accessible
4. Test logout functionality

### 3. Test Dashboard

Verify:
- ✅ Dashboard loads with stats
- ✅ Navigation works
- ✅ All menu items accessible
- ✅ Dark/light theme toggle works

### 4. Test CRUD Operations

Test each module:
- ✅ Pages: Create, edit, delete
- ✅ Blog: Create, edit, delete posts
- ✅ Solutions: Manage solutions and categories
- ✅ Media: Upload and delete files
- ✅ Users: Manage user accounts
- ✅ Settings: Update site settings

### 5. Test File Uploads

1. Go to Media section
2. Upload an image
3. Verify file appears in S3
4. Verify image displays correctly
5. Test file deletion

### 6. Check API Connection

Open browser DevTools → Network tab:
- ✅ All API calls return 200 status
- ✅ No CORS errors
- ✅ Authentication tokens are sent
- ✅ Responses are received correctly

---

## Troubleshooting

### Login Fails

**Problem**: Can't login to admin panel

**Solutions**:
1. Verify backend API is accessible
2. Check `NEXT_PUBLIC_API_URL` is correct
3. Verify admin user exists in database
4. Check browser console for errors
5. Verify CORS allows admin panel domain

### API Connection Errors

**Problem**: Admin panel can't connect to backend

**Solutions**:
1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check CORS configuration in Lambda
3. Verify API Gateway URL is accessible
4. Check browser console for specific errors
5. Test API endpoint directly with curl

### Build Errors

**Problem**: Build fails during deployment

**Solutions**:
1. Test build locally: `cd admin-panel && npm run build`
2. Check for TypeScript errors
3. Verify all dependencies are installed
4. Check Node.js version (should be 18+)
5. Clear `.next` directory and rebuild

### Environment Variables Not Working

**Problem**: Variables not accessible in browser

**Solutions**:
1. Ensure variables start with `NEXT_PUBLIC_`
2. Redeploy after adding variables
3. Clear browser cache
4. Check variable names match exactly
5. Verify variables are set for correct environment (Production/Preview)

### Token Refresh Issues

**Problem**: Session expires unexpectedly

**Solutions**:
1. Check token expiration settings in backend
2. Verify refresh token endpoint works
3. Check browser storage (localStorage/sessionStorage)
4. Verify token refresh logic in admin panel

### File Upload Fails

**Problem**: Can't upload files to media library

**Solutions**:
1. Verify S3 bucket is configured correctly
2. Check Lambda has S3 permissions
3. Verify file size is under 5MB limit
4. Check browser console for errors
5. Verify CORS allows file upload requests

---

## Security Considerations

1. ✅ **Use HTTPS only** (Vercel/Netlify provide this automatically)
2. ✅ **Change default admin password** immediately
3. ✅ **Limit admin panel access** (consider IP whitelisting)
4. ✅ **Enable 2FA** (if available in future updates)
5. ✅ **Regular security updates** for dependencies
6. ✅ **Monitor access logs** for suspicious activity
7. ✅ **Use strong passwords** for all admin users
8. ✅ **Limit CORS origins** to your domains only

---

## Cost Estimate

### Vercel
- **Free Tier**: 100GB bandwidth, unlimited requests
- **Pro**: $20/month (if needed)

### Netlify
- **Free Tier**: 100GB bandwidth, 300 build minutes/month
- **Pro**: $19/month (if needed)

### AWS S3 + CloudFront
- **S3 Storage**: ~$0.023/GB/month
- **CloudFront**: ~$0.085/GB (first 10TB)
- **Total**: ~$5-20/month depending on traffic

---

## Next Steps

1. ✅ Deploy admin panel
2. ✅ Update Lambda CORS with admin panel domain
3. ✅ Test login and all functionality
4. ✅ Change default admin password
5. ✅ Set up custom domain (optional)
6. ✅ Configure monitoring (optional)
7. ✅ Train users on admin panel usage

---

## Support

For issues:
- Check browser console for errors
- Verify environment variables
- Test API connection directly
- Review deployment logs
- Check Lambda CloudWatch logs

---

**Last Updated**: December 2025
**Status**: Production Ready

