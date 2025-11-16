# Quick Start Guide - SOOTHE TECHNOLOGIES Website

## ⚡ Get Running in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to http://localhost:3000

That's it! 🎉

## 📦 What's Included

✅ **9 Pages**: Home, About, Solutions, Inclusivity, Careers, Insights, Contact, Privacy, Terms
✅ **8 Components**: Header, Footer, Hero, and more
✅ **Full Accessibility**: WCAG 2.1 AA compliant with built-in controls
✅ **Responsive Design**: Mobile-first, works on all devices
✅ **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## 🎨 Color Palette

The site uses a unique, sophisticated color scheme:

- **Primary**: Deep Plum (#3a1a2c to #f5ebf1)
- **Accent**: Warm Coral (#fc6447 to #fff5f3)
- **Neutral**: Charcoal (#0a0a0a to #fafafa)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 📱 Testing the Site

### Desktop
- Navigate through all pages
- Test the accessibility controls (top-right corner)
- Try keyboard navigation (Tab, Enter, Escape)

### Mobile
- Open on mobile device or use browser DevTools
- Test hamburger menu
- Verify touch targets are large enough

### Accessibility
- Use Tab to navigate without mouse
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Adjust font size and high contrast mode
- Verify all images have alt text

## 🚀 Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

**Recommended**: Deploy to Vercel with one command:
```bash
npx vercel
```

## 🆘 Common Issues

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

### Dependencies Not Installing
Try clearing cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Make sure you have Node.js 18+ installed:
```bash
node --version
```

## 📚 Learn More

- [Full Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Pro Tips

1. **Accessibility First**: Always test with keyboard navigation
2. **Mobile Responsive**: Check on real devices, not just DevTools
3. **Performance**: Use Lighthouse to check Core Web Vitals
4. **SEO**: Update metadata in each page's metadata export

## 🎯 Next Steps

1. ✅ Install and run the site
2. ⬜ Customize content for your needs
3. ⬜ Add your company logo and images
4. ⬜ Configure analytics (if needed)
5. ⬜ Deploy to production

---

**Questions?** Check the [README](./README.md) or contact the development team.
