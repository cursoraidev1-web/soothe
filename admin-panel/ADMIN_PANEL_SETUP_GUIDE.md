# SOOTHE CMS Admin Panel - Production Setup Guide

This guide provides complete information about the SOOTHE CMS Admin Panel architecture, configuration, and deployment. Use this document with ChatGPT or any AI assistant to get step-by-step setup and deployment instructions.

## 📋 Project Overview

**SOOTHE CMS Admin Panel** is a modern, production-ready admin dashboard built with:
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **HTTP Client**: Axios with automatic token refresh
- **Form Handling**: React Hook Form + Zod validation
- **Authentication**: JWT (access + refresh tokens)
- **Deployment Target**: Vercel, Netlify, Render, or any Node.js hosting

## 🏗️ Project Structure

```
admin-panel/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── pages/                # Pages management (CRUD)
│   │   ├── solutions/            # Solutions management (CRUD)
│   │   ├── categories/           # Solution categories (CRUD)
│   │   ├── blog/                 # Blog posts (CRUD)
│   │   ├── careers/              # Job listings (CRUD)
│   │   ├── applicants/           # Job applications (view/manage)
│   │   ├── team/                 # Team members (CRUD)
│   │   ├── media/                # Media library (upload/manage)
│   │   ├── users/                # User management (CRUD)
│   │   ├── settings/             # Site settings
│   │   ├── contact/              # Contact submissions
│   │   └── accessibility/        # Accessibility settings
│   ├── auth/
│   │   └── login/                # Login page
│   ├── layout.tsx                # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── layout/                   # Layout components
│   │   ├── sidebar.tsx           # Sidebar navigation
│   │   └── header.tsx            # Header with theme toggle
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── skeleton.tsx
│   │   └── toast.tsx
│   ├── data-table.tsx            # Reusable data table
│   ├── file-upload.tsx           # File upload component
│   ├── rich-text-editor.tsx       # Rich text editor (React Quill)
│   ├── array-input.tsx           # Dynamic array input
│   └── theme-provider.tsx        # Theme context
├── lib/
│   ├── api.ts                    # Axios client with auth
│   ├── types.ts                  # TypeScript types
│   ├── utils.ts                  # Utility functions
│   └── store.ts                  # Zustand stores (auth, sidebar)
├── types/
│   └── react-quill-css.d.ts      # Type declarations
├── package.json
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── postcss.config.js              # PostCSS configuration
```

## 🔧 Prerequisites

### Required:
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Backend API** running and accessible (NestJS backend)
- **Git** (for deployment)

### Backend Requirements:
- Backend must be deployed and accessible
- CORS must be configured to allow admin panel domain
- JWT authentication must be enabled
- API endpoints must be available at `/api/v1/*`

## 📝 Environment Variables

Create a `.env.local` file in the `admin-panel/` directory (or set in your hosting platform):

### **Required Variables:**

```env
# Backend API URL (REQUIRED)
# Development: http://localhost:3000/api/v1
# Production: https://your-backend.onrender.com/api/v1
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

### **Optional Variables:**

```env
# Site URL (for redirects, OAuth callbacks, etc.)
NEXT_PUBLIC_SITE_URL=http://localhost:3001
# Production: https://admin.yourdomain.com
```

**Important Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Never put secrets in `NEXT_PUBLIC_*` variables
- Update `NEXT_PUBLIC_API_URL` to your production backend URL before deployment
- The API URL should include the `/api/v1` path

## 🚀 Local Development Setup

### 1. Install Dependencies

```bash
cd admin-panel
npm install
```

### 2. Configure Environment

```bash
# Create .env.local file
cp .env.example .env.local  # If .env.example exists
# Or create manually:
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1" > .env.local
```

### 3. Start Development Server

```bash
npm run dev
```

The admin panel will be available at: `http://localhost:3001`

### 4. Verify Setup

1. Open `http://localhost:3001/auth/login`
2. Login with backend credentials (default: `admin@soothe.com` / `Admin@123`)
3. You should be redirected to the dashboard

## 🔐 Authentication Flow

### How It Works:

1. **Login**: User submits credentials → Backend validates → Returns JWT tokens
2. **Token Storage**: Access token and refresh token stored in `localStorage`
3. **API Requests**: Axios automatically attaches `Authorization: Bearer <token>` header
4. **Token Refresh**: On 401 error, automatically refreshes token using refresh token
5. **Logout**: Clears tokens and redirects to login

### Token Management:

- **Access Token**: Short-lived (15 minutes default)
- **Refresh Token**: Long-lived (7 days default)
- **Storage**: `localStorage` (browser)
- **Auto-refresh**: Handled automatically by API client

## 🎨 Features & Functionality

### Core Features:
- ✅ **Authentication**: Secure JWT-based auth with auto-refresh
- ✅ **Role-Based Access Control (RBAC)**: SUPER_ADMIN, ADMIN, EDITOR, AUTHOR, VIEWER
- ✅ **Dark/Light Theme**: Automatic theme switching with `next-themes`
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Real-time Data**: Live data from backend API
- ✅ **Form Validation**: Zod schema validation with React Hook Form
- ✅ **Toast Notifications**: User feedback with Sonner
- ✅ **Loading States**: Skeleton loaders and loading indicators
- ✅ **Error Handling**: Comprehensive error handling and display

### Available Modules:

1. **Dashboard**: Overview with statistics and quick actions
2. **Pages**: Full CRUD for dynamic pages
3. **Solutions**: Manage solutions and categories
4. **Blog**: Create and manage blog posts
5. **Careers**: Job listings and applications
6. **Team**: Team member management
7. **Media**: File upload and media library
8. **Users**: User management with role assignment
9. **Settings**: Site-wide configuration
10. **Contact**: View contact form submissions
11. **Accessibility**: Accessibility settings and compliance

## 📦 Build & Production

### Build for Production:

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

### Start Production Server:

```bash
npm start
```

### Build Output:

- **Standalone Mode**: Enabled in `next.config.js` for Docker deployments
- **Optimized Images**: AVIF and WebP formats
- **Code Splitting**: Automatic route-based code splitting
- **Minification**: SWC minification enabled

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Environment variable management

**Steps:**

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd admin-panel
   vercel
   ```

3. **Set Environment Variables**:
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
   - Example: `https://soothe-backend.onrender.com/api/v1`

4. **Configure Build Settings**:
   - Root Directory: `admin-panel` (if deploying from monorepo)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Custom Domain** (optional):
   - Add your domain in Vercel Dashboard
   - Update DNS records as instructed

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Create `netlify.toml`**:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Set Environment Variables**:
   ```bash
   netlify env:set NEXT_PUBLIC_API_URL "https://your-backend.onrender.com/api/v1"
   ```

### Option 3: Render

**Steps:**

1. **Create Web Service** on Render
2. **Connect Repository** (GitHub/GitLab)
3. **Build Settings**:
   - **Root Directory**: `admin-panel`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
   - `NODE_ENV`: `production`

5. **Deploy**: Render will automatically deploy on git push

### Option 4: Docker

**Create `Dockerfile`**:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and Run**:

```bash
docker build -t soothe-admin .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-backend.com/api/v1 soothe-admin
```

## 🔗 Backend Connection

### Backend CORS Configuration

The backend must allow requests from your admin panel domain. Update backend `CORS_ORIGIN`:

```env
# Backend .env
CORS_ORIGIN=https://admin.yourdomain.com,https://your-admin.vercel.app
```

### API Endpoints Used

The admin panel communicates with these backend endpoints:

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/settings` - Get site settings
- `GET /api/v1/pages` - List pages
- `POST /api/v1/pages` - Create page
- `PUT /api/v1/pages/:id` - Update page
- `DELETE /api/v1/pages/:id` - Delete page
- `GET /api/v1/solutions` - List solutions
- `GET /api/v1/blog` - List blog posts
- `GET /api/v1/careers` - List careers
- `GET /api/v1/users` - List users
- `GET /api/v1/media` - List media files
- `POST /api/v1/media/upload` - Upload file
- And more...

### Testing Backend Connection

```bash
# Test if backend is accessible
curl https://your-backend.onrender.com/api/v1/settings

# Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-backend.onrender.com/api/v1/pages
```

## 🎯 Production Checklist

Before deploying to production:

- [ ] **Environment Variables**: Set `NEXT_PUBLIC_API_URL` to production backend
- [ ] **Backend CORS**: Update backend `CORS_ORIGIN` to include admin panel domain
- [ ] **Build Test**: Run `npm run build` locally to verify no errors
- [ ] **Image Domains**: Update `next.config.js` `remotePatterns` if using custom backend domain
- [ ] **HTTPS**: Ensure both frontend and backend use HTTPS in production
- [ ] **Error Monitoring**: Set up error tracking (Sentry, LogRocket, etc.)
- [ ] **Analytics**: Add analytics if needed (Google Analytics, etc.)
- [ ] **Backup**: Ensure backend database is backed up
- [ ] **Testing**: Test login, CRUD operations, file uploads
- [ ] **Performance**: Test page load times and optimize if needed

## 🐛 Troubleshooting

### Build Errors

**Error: Module not found**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: Type errors**
```bash
# Solution: Run type check
npm run type-check
```

### Runtime Errors

**CORS Errors:**
- Verify backend `CORS_ORIGIN` includes admin panel domain
- Check browser console for exact error
- Ensure backend is accessible from admin panel domain

**Authentication Errors:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running and accessible
- Verify JWT secrets match between frontend and backend
- Check browser localStorage for tokens

**Image Loading Errors:**
- Update `next.config.js` `remotePatterns` with backend domain
- Verify backend serves images at `/uploads/**` path
- Check image URLs in browser network tab

### Common Issues

**"Cannot connect to backend"**
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend is running and accessible
- Test backend URL in browser: `https://your-backend.com/api/v1/settings`

**"401 Unauthorized"**
- Check if tokens are stored in localStorage
- Verify token refresh is working
- Check backend JWT configuration

**"Images not loading"**
- Update `next.config.js` with backend image domain
- Verify backend serves static files correctly
- Check image URLs are correct

## 📊 Performance Optimization

### Already Optimized:
- ✅ Next.js Image optimization (AVIF, WebP)
- ✅ Code splitting (automatic route-based)
- ✅ SWC minification
- ✅ Standalone output for Docker

### Additional Optimizations:

1. **CDN**: Use Vercel/Netlify CDN (automatic)
2. **Caching**: Configure API response caching
3. **Lazy Loading**: Components already lazy-loaded
4. **Bundle Analysis**: Run `npm run build` and check `.next` size

## 🔒 Security Considerations

### Implemented:
- ✅ JWT authentication
- ✅ Token auto-refresh
- ✅ Protected routes (middleware)
- ✅ HTTPS in production (hosting provider)
- ✅ XSS protection headers
- ✅ Content Security Policy (configure in hosting)

### Additional Security:

1. **Environment Variables**: Never commit `.env.local`
2. **API Keys**: Don't expose secrets in `NEXT_PUBLIC_*` vars
3. **CORS**: Configure backend CORS properly
4. **Rate Limiting**: Backend should implement rate limiting
5. **Input Validation**: All forms use Zod validation

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Zustand**: https://github.com/pmndrs/zustand
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev

## 🎯 Quick Start Commands

```bash
# Development
npm install
npm run dev

# Production Build
npm run build
npm start

# Type Check
npm run type-check

# Lint
npm run lint
```

## 📞 Support

For issues or questions:
- Check this guide first
- Review `README.md` in admin-panel directory
- Check backend API documentation at `/api/docs`
- Verify environment variables are set correctly
- Check browser console for errors

---

**Note for AI Assistants**: Use this document to provide step-by-step instructions for:
1. Setting up the admin panel locally
2. Configuring environment variables
3. Building for production
4. Deploying to various platforms (Vercel, Netlify, Render, Docker)
5. Connecting to the backend API
6. Troubleshooting common issues
7. Optimizing for production

Focus on practical, actionable steps with code examples and command-line instructions where relevant.



