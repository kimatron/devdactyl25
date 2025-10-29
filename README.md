# Devdactyl Portfolio

A portfolio and business website for Devdactyl - a web design and software development studio based in Wexford, Ireland.

## What This Is

My personal portfolio site showcasing what I do, how I work, and some thoughts on building digital tools. It's built to be fast, animated, and a bit different from the cookie-cutter templates out there.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (because life's too short for slow builds)
- **Tailwind CSS** - Utility-first styling via CDN
- **GSAP 3.12** - Animation library (ScrollTrigger, Draggable)

## The Animation Bit

Heavy use of GSAP throughout:
- Scroll-triggered reveals on Services and Featured Work sections
- 3D card transforms with glow effects on hover
- Ken Burns effect on blog hero images
- Particle canvas animation on the hero section
- Smooth page transitions and modal animations

The animations aren't just decoration - they guide the user's eye and make the experience feel intentional.

## Style & Design

- Dark theme with yellow (`#facc15`) accent color
- Textured background (gun-metal pattern)
- Two font families:
  - **Inter** - Body text
  - **JetBrains Mono** - Headings and code-style text
- Glassmorphism effects (backdrop blur, semi-transparent backgrounds)
- Mobile-first responsive design

## Key Features

### Sections
- **Hero** - Animated particle canvas with bold typography
- **Services** - Scroll-triggered alternating layout panels
- **Featured Work** - Project showcase with tags
- **About** - Personal background
- **Blog** - Full blog system with modal reader and related posts
- **Contact** - Form with direct email/phone links
- **FAQ** - Expandable accordion (honest answers, no corporate speak)

### Blog System
- Individual blog posts with full-screen modal reader
- Ken Burns effect on hero images
- Related posts suggestions
- Category tagging
- Smooth transitions between posts

### Interaction
- Scroll-to-top button
- Smooth scroll navigation
- View switching between home and blog pages
- 3D hover effects on cards
- Responsive mobile menu (implicit in header structure)

## Project Structure

```
/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── FeaturedWork.tsx
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── BlogPage.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── blogData.ts         # Blog post content
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main app component
└── index.html          # Entry point with SEO meta tags
```

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Dev server runs on `http://localhost:3000`

## Design Philosophy

Built with the same principles I apply to client work:
- **Fast** - Optimized performance, minimal dependencies
- **Functional** - Every element serves a purpose
- **Honest** - No fake testimonials, no stock photos pretending to be the team
- **Personal** - This is my brand, not a corporate facade

## SEO

Comprehensive meta tags for social sharing, proper semantic HTML, and mobile-friendly viewport configuration. Canonical URL and Open Graph tags included.

## Browser Support

Modern browsers with ES2022 support. If you're still on Internet Explorer, we need to have a different conversation.

---

Built by [Kim Hanlon](https://devdactyl.ie) | Wexford, Ireland