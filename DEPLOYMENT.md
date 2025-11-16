# Deployment Guide - SOOTHE TECHNOLOGIES Website

## Quick Start Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Option 3: Docker

1. **Create Dockerfile** (if needed)
   ```dockerfile
   FROM node:18-alpine AS base
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t soothe-website .
   docker run -p 3000:3000 soothe-website
   ```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Performance Optimization

- ✅ Static page generation enabled
- ✅ Image optimization with Next.js Image component
- ✅ Font optimization with next/font
- ✅ Code splitting automatic with Next.js

## Monitoring

Consider adding:
- Google Analytics or privacy-focused alternative (e.g., Plausible)
- Error tracking (e.g., Sentry)
- Performance monitoring (e.g., Web Vitals)

## Post-Deployment Checklist

- [ ] Test all pages on mobile and desktop
- [ ] Run Lighthouse accessibility audit
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Verify all forms work correctly
- [ ] Check all navigation links
- [ ] Test accessibility controls
- [ ] Verify responsive design on multiple devices
- [ ] Test keyboard navigation
- [ ] Check console for errors
- [ ] Verify SEO meta tags
