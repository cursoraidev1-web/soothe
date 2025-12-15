# Frontend Deployment Guide

Complete guide for deploying the SOOTHE Technologies public website (frontend) to production.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Option 1: Vercel Deployment (Recommended)](#option-1-vercel-deployment-recommended)
5. [Option 2: Netlify Deployment](#option-2-netlify-deployment)
6. [Option 3: AWS S3 + CloudFront](#option-3-aws-s3--cloudfront)
7. [Connecting to Lambda Backend](#connecting-to-lambda-backend)
8. [Custom Domain Setup](#custom-domain-setup)
9. [Post-Deployment Verification](#post-deployment-verification)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The frontend is a Next.js 14 application that displays the public-facing website. It connects to your AWS Lambda backend API for dynamic content.

**Recommended**: Vercel (easiest, free tier available, automatic deployments)

---

## Prerequisites

- ✅ Lambda backend deployed and API Gateway URL available
- ✅ Git repository with your code
- ✅ Node.js 18+ installed locally (for testing)
- ✅ Domain name (optional, for custom domain)

---

## Environment Variables

Create a `.env.local` file in the root directory (frontend):

```env
# Backend API URL (from Lambda API Gateway)
NEXT_PUBLIC_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1

# Site Configuration
NEXT_PUBLIC_SITE_NAME=SOOTHE Technologies
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
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

### Step 3: Deploy

```bash
# From root directory (where package.json is)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? soothe-frontend (or your choice)
# - Directory? ./ (current directory)
# - Override settings? No
```

### Step 4: Set Environment Variables

```bash
# Set API URL
vercel env add NEXT_PUBLIC_API_URL

# Enter value: https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1
# Apply to: Production, Preview, Development (all)

# Set site URL
vercel env add NEXT_PUBLIC_SITE_URL
# Enter value: https://yourdomain.com
```

Or via Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save

### Step 5: Redeploy

```bash
# Redeploy to apply environment variables
vercel --prod
```

### Step 6: Get Deployment URL

After deployment, you'll get a URL like:
```
https://soothe-frontend.vercel.app
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

Create `netlify.toml` in root directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

### Step 4: Deploy

```bash
# Build and deploy
netlify deploy --prod

# Or for preview
netlify deploy
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
netlify env:set NEXT_PUBLIC_SITE_URL "https://yourdomain.com"
```

---

## Option 3: AWS S3 + CloudFront

### Step 1: Build for Static Export

Update `next.config.js`:

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

### Step 2: Build the Application

```bash
npm run build
```

This creates an `out` directory with static files.

### Step 3: Create S3 Bucket

```bash
aws s3 mb s3://soothe-frontend-{your-unique-id} --region us-east-1
```

### Step 4: Upload Files

```bash
aws s3 sync out/ s3://soothe-frontend-{your-unique-id} --delete
```

### Step 5: Configure Bucket for Static Website

```bash
aws s3 website s3://soothe-frontend-{your-unique-id} \
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
      "Resource": "arn:aws:s3:::soothe-frontend-{your-unique-id}/*"
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

### Step 8: Set Environment Variables

Since it's a static export, you'll need to set environment variables at build time:

```bash
NEXT_PUBLIC_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1 \
NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
npm run build
```

Then upload the `out` directory again.

---

## Connecting to Lambda Backend

### Step 1: Get Lambda API Gateway URL

From your Lambda deployment output:
```
https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1
```

### Step 2: Update Frontend Environment Variable

Set `NEXT_PUBLIC_API_URL` to your Lambda API Gateway URL.

### Step 3: Update Lambda CORS

In your Lambda backend, update `CORS_ORIGIN` to include your frontend domain:

```bash
# Update serverless.yml or redeploy with updated .env
CORS_ORIGIN="https://yourdomain.com,https://www.yourdomain.com,https://soothe-frontend.vercel.app"
```

### Step 4: Verify Connection

Test that frontend can reach backend:

```bash
# From browser console on your deployed site
fetch('https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1/settings')
  .then(r => r.json())
  .then(console.log)
```

---

## Custom Domain Setup

### Vercel

1. Go to Project → Settings → Domains
2. Add your domain (e.g., `yourdomain.com`)
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

### 1. Test Homepage

Visit your deployed URL and verify:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Images display
- ✅ No console errors

### 2. Test API Connection

Open browser DevTools → Console:

```javascript
// Should return settings data
fetch('YOUR_API_URL/settings')
  .then(r => r.json())
  .then(console.log)
```

### 3. Test Dynamic Pages

Visit:
- `/blog` - Should load blog posts from API
- `/solutions` - Should load solutions from API
- `/careers` - Should load job listings from API

### 4. Test Forms

- Contact form should submit to backend
- Career applications should work

### 5. Check Performance

- Run Lighthouse audit
- Check Core Web Vitals
- Verify images are optimized

---

## Troubleshooting

### API Connection Errors

**Problem**: Frontend can't connect to backend

**Solutions**:
1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check CORS configuration in Lambda
3. Verify API Gateway URL is accessible
4. Check browser console for specific errors

### Build Errors

**Problem**: Build fails during deployment

**Solutions**:
1. Test build locally: `npm run build`
2. Check for TypeScript errors
3. Verify all dependencies are installed
4. Check Node.js version (should be 18+)

### Environment Variables Not Working

**Problem**: Variables not accessible in browser

**Solutions**:
1. Ensure variables start with `NEXT_PUBLIC_`
2. Redeploy after adding variables
3. Clear browser cache
4. Check variable names match exactly

### 404 Errors on Routes

**Problem**: Direct URL access returns 404

**Solutions**:
1. For Vercel/Netlify: Should work automatically
2. For S3: Configure error document to `index.html`
3. For CloudFront: Set custom error responses

### Images Not Loading

**Problem**: Images from S3 not displaying

**Solutions**:
1. Check S3 bucket CORS configuration
2. Verify images are publicly accessible
3. Check image URLs in database
4. Verify CloudFront distribution (if using)

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

1. ✅ Deploy frontend
2. ✅ Update Lambda CORS with frontend domain
3. ✅ Test all pages and functionality
4. ✅ Set up custom domain (optional)
5. ✅ Configure monitoring (optional)
6. ✅ Set up analytics (optional)

---

## Support

For issues:
- Check browser console for errors
- Verify environment variables
- Test API connection directly
- Review deployment logs

---

**Last Updated**: December 2025
**Status**: Production Ready

