# SOOTHE TECHNOLOGIES LIMITED - Corporate Website

![SOOTHE TECHNOLOGIES](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8)
![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green)

A modern, accessible, and user-centric corporate website for SOOTHE TECHNOLOGIES LIMITED - a company dedicated to making technology work for everyone.

## 🌟 Overview

**Mission**: To simplify everyday life by developing innovative, accessible, and user-centric apps and websites focusing on productivity, wellness, and inclusivity.

**Strapline**: "Making life easier. Inclusive. One solution at a time."

## ✨ Key Features

### 🎨 Unique Design System
- **Sophisticated Color Palette**: Deep plum (#3a1a2c) and warm coral (#fc6447) - deliberately avoiding traditional tech colors (blue, red, yellow, green)
- **Modern Typography**: Space Grotesk for headings, Inter for body text
- **Fluid Animations**: Subtle, professional animations using Framer Motion

### ♿ Accessibility-First Architecture
- **WCAG 2.1 AA Compliance**: Built with accessibility at the core, not as an afterthought
- **Full Keyboard Navigation**: Complete site navigation without a mouse
- **Screen Reader Optimized**: Semantic HTML and ARIA labels throughout
- **Accessibility Controls**: User-adjustable font size and high-contrast mode
- **Skip Links**: Quick navigation to main content
- **Focus Management**: Clear focus indicators for all interactive elements

### 📱 Responsive & Adaptive
- Mobile-first design approach
- Fluid layouts that work on all screen sizes
- Touch-friendly interactive elements
- Optimized for performance across devices

### 🚀 Modern Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth, accessible animations
- **Fonts**: Google Fonts (Inter, Space Grotesk) with display swap

## 📂 Site Structure

```
/                    - Home (Hero, Key Pillars, Solutions Overview)
/about              - Company mission, values, team
/solutions          - Product ecosystem (Productivity, Wellness, Assistive Tech, Smart Living)
/inclusivity        - Accessibility commitment and standards
/careers            - Job openings and company culture
/insights           - Blog/articles on technology and accessibility
/contact            - Contact form with multiple inquiry types
/privacy            - Privacy policy
/terms              - Terms of service
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## 🎨 Design Philosophy

### Visual Identity
- **Ever-thinking, Evolving, Unique**: Dynamic and intelligent design that feels alive
- **Human-Centric**: Technology as a bridge, not a barrier
- **Warm & Approachable**: Avoiding cold, sterile tech aesthetics

### Color System
```css
Primary (Deep Plum):    #3a1a2c to #f5ebf1
Accent (Warm Coral):    #fc6447 to #fff5f3
Neutral (Charcoal):     #0a0a0a to #fafafa
```

### Typography
- **Display Font**: Space Grotesk - distinctive, modern, with personality
- **Body Font**: Inter - clean, highly readable, accessible

## ♿ Accessibility Features

### Built-in Controls
- **Font Size Adjustment**: 80% to 140% with persistent storage
- **High Contrast Mode**: Enhanced contrast for visual impairments
- **Keyboard Navigation**: Full site access via keyboard
- **Screen Reader Support**: Semantic HTML and ARIA labels

### Compliance Standards
- ✅ WCAG 2.1 Level AA (targeting AAA)
- ✅ Section 508 compliance
- ✅ Reduced motion support
- ✅ High contrast mode support
- ✅ Focus visible indicators

### Testing Recommendations
- Use browser DevTools Lighthouse for accessibility audits
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard-only navigation
- Test with browser zoom at 200%
- Check color contrast ratios

## 🧩 Component Architecture

### Core Components
- `Header` - Sticky navigation with mobile menu
- `Footer` - Site links and company information
- `AccessibilityControls` - User-adjustable accessibility settings
- `Hero` - Landing page hero with animations
- `KeyPillars` - Company's three core pillars
- `SolutionsOverview` - Product ecosystem showcase
- `InclusivityHighlight` - Accessibility commitment feature

### Page Components
Each page is a self-contained component in `/app/[page]/page.tsx` following Next.js 14 App Router conventions.

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📝 Content Management

The site is built with static content that can be easily updated by modifying the TypeScript components. For a full CMS integration, consider:
- Contentful
- Sanity
- Strapi
- WordPress (headless)

## 🤝 Contributing

This is a corporate website for SOOTHE TECHNOLOGIES LIMITED. For internal contributions:
1. Create a feature branch
2. Make your changes
3. Ensure accessibility standards are maintained
4. Submit a pull request

## 📄 License

© 2025 SOOTHE TECHNOLOGIES LIMITED. All rights reserved.

## 📞 Contact

- **Email**: hello@soothetech.com
- **Website**: [Coming Soon]
- **Accessibility Questions**: accessibility@soothetech.com

## 🙏 Acknowledgments

Built with accessibility and inclusivity at the core, inspired by the belief that technology should work for everyone, without exception.

---

**"Technology as a Bridge, Not a Barrier"** - SOOTHE TECHNOLOGIES LIMITED