# Portfolio Website - Oscar Johansson

This portfolio website showcases Oscar Johansson's elite Taekwondo journey and professional services (web development and AI automation) to attract potential clients and sponsors.

## Project Overview

**Purpose:** Professional portfolio to showcase:
- Elite Taekwondo athlete career and achievements
- Web development services
- AI automation and specialist services

**Target Audience:** Potential clients and sponsors (Swedish-speaking market)

**Language:** Swedish for all user-facing content, English for code comments

**Contact:** info@oscarjohansson.eu

## Tech Stack

### Core Framework
- **React:** 19.2.3 (latest stable)
- **TypeScript:** 5.8.2 (strict mode, ES2022 target)
- **Vite:** 6.2.0 (build tool and dev server)

### UI & Animation Libraries
- **Tailwind CSS:** CDN-based (runtime compilation, loaded in index.html)
- **Framer Motion:** 12.23.26 (smooth animations and transitions)
- **Lucide React:** 0.562.0 (icon library)
- **Embla Carousel React:** 8.6.0 + autoplay plugin

### Form Management
- **React Hook Form:** 7.69.0 (form state and validation)

### Development
- **@vitejs/plugin-react:** 5.0.0
- **@types/node:** 22.14.0

### Deployment
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18
- **Custom Domain:** oscarjohansson.eu

## Project Structure

```
root/
├── components/
│   ├── Navbar.tsx              # Fixed navbar with mobile menu
│   ├── Hero.tsx                # Full-screen hero with split backgrounds
│   ├── About.tsx               # About section with carousel/grid
│   ├── TaekwondoCarousel.tsx   # Embla carousel for mobile
│   ├── Portfolio.tsx           # Project showcase grid
│   ├── ProjectCard.tsx         # Individual project cards
│   ├── Services.tsx            # Service offerings
│   ├── Contact.tsx             # Contact form with validation
│   └── Footer.tsx              # Footer with social links
├── public/
│   ├── for hero/               # Hero section images
│   └── compressed 2/           # About/portfolio images
├── App.tsx                     # Root component
├── index.tsx                   # React DOM entry point
├── index.html                  # HTML template with Tailwind CDN
├── index.css                   # Global styles and accessibility
├── types.ts                    # TypeScript interfaces
├── vite.config.ts              # Vite configuration
├── vercel.json                 # Deployment config
└── package.json                # Dependencies
```

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Dev Server
- **Port:** 3000
- **Host:** 0.0.0.0 (accessible from network)
- **Hot Module Replacement:** Enabled

## Component Patterns

### Component Structure
```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentNameProps {
  // Props interface above component
  title: string;
  optional?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({ title, optional }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default ComponentName;
```

### Key Conventions
- **Components:** Functional components with `React.FC<Props>` type annotations
- **Props:** Interfaces defined above each component
- **Exports:** Default exports for all components
- **State:** `useState` for local state, react-hook-form for forms
- **Naming:** PascalCase for components, camelCase for functions/variables

### Animation Patterns
```typescript
// Entrance animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Scroll-triggered animations
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

// Hover animations
<motion.div
  whileHover={{ y: -8 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

## Styling Conventions

### Tailwind CSS
- **Delivery:** CDN-based (loaded in index.html, NO build-time compilation)
- **Configuration:** Custom theme colors defined in HTML `<script>` tag

**Custom Theme Colors:**
```javascript
primary: '#0F172A',    // slate-900
accent: '#3B82F6',     // blue-500
secondary: '#64748B',  // slate-500
background: '#F8FAFC'  // slate-50
```

### Custom CSS (index.css)
- Global resets with `overflow-x-hidden` on html, body, #root
- Typography improvements (line-height, letter-spacing)
- Accessibility focus states (2px blue ring)
- Smooth transitions (0.2s ease-in-out)
- Minimum touch target sizes (44px)

### Responsive Design
- **Mobile First:** Design for mobile, enhance for desktop
- **Breakpoints:** sm (640px), md (768px), lg (1024px)
- **Visibility:** Use `hidden lg:block` or `block lg:hidden` patterns
- **Grid:** Use Tailwind's `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Component Details

### Navbar ([components/Navbar.tsx](components/Navbar.tsx))
**Features:**
- Fixed positioning with scroll detection (bg changes on scroll)
- Mobile menu with slide-in animation (Framer Motion)
- Smooth scroll to sections (preventDefault + scrollIntoView)
- Scroll position restoration when menu opens/closes
- Lucide React icons

**Key Functions:**
- `handleNavClick()` - Smooth scroll to sections
- `handleMobileNavClick()` - Close menu and scroll
- `useEffect` - Scroll listener for navbar styling

**Important:** Recently fixed scroll behavior - test thoroughly before modifying.

### Hero ([components/Hero.tsx](components/Hero.tsx))
**Features:**
- Full-screen split background (left/right images)
- Gradient overlay for text readability
- Staggered CTA button animations
- Eager image loading (above fold)

**Layout:** Split background with centered content container.

### About ([components/About.tsx](components/About.tsx))
**Features:**
- Mobile: TaekwondoCarousel component
- Desktop: 2-column image grid with complex heights
- whileInView animations for scroll triggers
- Hover scale effect on images

**Images:** 3 images with different aspect ratios in responsive grid.

### TaekwondoCarousel ([components/TaekwondoCarousel.tsx](components/TaekwondoCarousel.tsx))
**Features:**
- Mobile-only (hidden on lg+ breakpoints)
- Embla Carousel with autoplay plugin
- Auto-resume after 10 seconds of inactivity
- Keyboard navigation (arrow keys, space/enter)
- Touch/swipe support
- Navigation arrows fade after 3 seconds
- Image counter display

**Important:** Complex interaction states - test keyboard nav and autoplay behavior.

### Portfolio ([components/Portfolio.tsx](components/Portfolio.tsx))
**Features:**
- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- Static project data array (hardcoded)
- Uses Project interface from types.ts

**Data Location:** Projects array defined in component file.

### ProjectCard ([components/ProjectCard.tsx](components/ProjectCard.tsx))
**Features:**
- Hover animation (y: -8px with spring physics)
- Image hover overlay with external link icon
- Lazy loading images
- Lucide React ExternalLink icon

**Animation:** Spring-based hover with stiffness: 300.

### Services ([components/Services.tsx](components/Services.tsx))
**Features:**
- Two service cards: WebDev & AI-Automation
- Animated background blobs (CSS keyframes)
- Icon gradient backgrounds with hover effects
- Feature lists with color-coded checkmarks
- Responsive 2-column layout

**Animations:** CSS keyframe animations for decorative blobs.

### Contact ([components/Contact.tsx](components/Contact.tsx))
**Features:**
- React Hook Form with validation
- Fields: name, email, service checkboxes, message
- Email pattern validation
- Loading state during submission
- Success message with 5-second auto-hide
- Dark background styling

**Validation Rules:**
- Name: Required
- Email: Required + pattern validation
- Message: Required

**Important:** Maintain validation rules - form quality is critical for client acquisition.

### Footer ([components/Footer.tsx](components/Footer.tsx))
**Features:**
- Social links: Instagram, LinkedIn
- Email contact link
- Dynamic copyright year (`new Date().getFullYear()`)

**Important:** Year is dynamic - never hardcode.

## Image Management

### Image Locations
- **Hero Images:** `public/for hero/` (split background images)
- **About/Portfolio:** `public/compressed 2/` (carousel and grid images)

### Image Loading Strategy
- **Above Fold (Hero):** Eager loading (`loading="eager"`)
- **Below Fold (About, Portfolio):** Lazy loading (`loading="lazy"`)

### Usage Pattern
```typescript
// Always use public/ URL references
<img src="/for hero/image.jpg" alt="Description" />
<img src="/compressed 2/image.jpg" alt="Description" loading="lazy" />
```

**Important:** Images moved to public/ for production builds - never import from relative paths.

## Type Safety

### TypeScript Configuration
- **Strict Mode:** Enabled
- **Target:** ES2022
- **Module:** ESNext
- **Lib:** ES2022, DOM, DOM.Iterable
- **Path Alias:** `@/` → root directory

### Shared Types (types.ts)
```typescript
export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}
```

### Component Typing Pattern
```typescript
interface Props {
  required: string;
  optional?: number;
}

const Component: React.FC<Props> = ({ required, optional }) => {
  // Component implementation
};
```

## Accessibility Standards

### Focus States
- 2px blue ring on focus-visible
- Visible keyboard navigation
- Proper tab order

### Touch Targets
- Minimum 44px for all interactive elements
- Proper spacing between clickable areas

### ARIA Labels
- Add aria-label to icon-only buttons
- Use role attributes for custom elements
- Ensure proper heading hierarchy

### Keyboard Navigation
- Full keyboard support in carousel
- Enter/Space for button activation
- Proper focus management in mobile menu

### Language
- `lang="sv"` on HTML element
- Swedish content for screen readers

## Content & Language

### Primary Language: Swedish
- All user-facing text in Swedish
- UI labels, buttons, form fields
- Error messages and validation text
- Success/confirmation messages

### Code Comments
- Mix of English and Swedish
- Technical comments in English
- User-facing comment references in Swedish

### Tone & Voice
- Professional yet approachable
- Emphasize elite athlete mindset + technical expertise
- Confidence without arrogance
- Action-oriented CTAs

### Target Keywords
- Webbutvecklare (Web Developer)
- AI-specialist (AI Specialist)
- Automation
- Elite Taekwondo
- Portfolio

## Quality Standards

### Before Making Changes
1. **Understand existing patterns** - Read similar components first
2. **Check types.ts** - Use existing interfaces before creating new ones
3. **Review component structure** - Follow established patterns
4. **Maintain Swedish language** - All user-facing text in Swedish
5. **Consider mobile first** - Mobile responsiveness is critical

### During Development
1. **Follow naming conventions** - PascalCase components, camelCase functions
2. **Use Framer Motion** - For complex animations (not CSS unless decorative)
3. **Maintain responsiveness** - Test at mobile, tablet, desktop breakpoints
4. **Add TypeScript types** - All props, state, and functions
5. **Use Lucide React** - For all icons (consistent library)
6. **Preserve accessibility** - Focus states, ARIA labels, keyboard nav

### Before Committing
1. **Test mobile and desktop** - Verify responsive behavior
2. **Check accessibility** - Keyboard navigation, focus states
3. **Build TypeScript** - Run `npm run build` to verify compilation
4. **Test forms** - If Contact form changed, test validation
5. **Verify animations** - Smooth performance, no jank
6. **Check images** - Load correctly from public/ folder
7. **Test mobile menu** - Open/close functionality works

## Safety Rules

### NEVER Do These Things
- ❌ **Remove overflow-x-hidden** - Fixes horizontal scroll on mobile (critical fix)
- ❌ **Edit Navbar scroll logic** - Recently fixed, works correctly now
- ❌ **Change Tailwind CDN setup** - Project uses runtime CDN, not build-time
- ❌ **Hardcode years** - Use `new Date().getFullYear()` for dynamic dates
- ❌ **Skip form validation** - Contact form validation is essential for quality
- ❌ **Break mobile menu** - Recently fixed close functionality
- ❌ **Mix languages in UI** - Swedish only for user-facing text
- ❌ **Import images from relative paths** - Use public/ folder URLs

### ALWAYS Do These Things
- ✅ **Test mobile menu** - Verify open/close/navigation after changes
- ✅ **Preserve Swedish language** - All UI text remains in Swedish
- ✅ **Use public/ folder** - Images load from public/ for production builds
- ✅ **Test scroll behavior** - After any navbar or section changes
- ✅ **Maintain type safety** - All components fully typed
- ✅ **Add lazy loading** - Images below fold should lazy load
- ✅ **Check mobile responsiveness** - Mobile-first is critical

## Common Mistakes to Avoid

1. **Image Imports**
   - ❌ `import img from './images/photo.jpg'`
   - ✅ `<img src="/for hero/photo.jpg" />`

2. **Horizontal Scrolling**
   - ❌ Adding elements that overflow viewport width
   - ✅ Use `overflow-x-hidden` and constrain widths

3. **Mobile Menu**
   - ❌ Breaking close button or scroll restoration
   - ✅ Test menu open/close/navigation thoroughly

4. **Language Mixing**
   - ❌ "Send message" button text
   - ✅ "Skicka meddelande" button text

5. **Image Loading**
   - ❌ All images eager loading
   - ✅ Hero eager, below-fold lazy

6. **Scroll Behavior**
   - ❌ Changing navbar scroll detection without testing
   - ✅ Test scroll behavior at different viewport sizes

7. **Hardcoded Data**
   - ❌ Projects data embedded in JSX
   - ✅ Projects data in array, mapped to components

8. **Component Type**
   - ❌ Class components
   - ✅ Functional components with React.FC

9. **TypeScript**
   - ❌ Skipping prop types
   - ✅ All props fully typed with interfaces

## Recent Fixes (Do Not Break)

These issues were recently resolved - be careful not to reintroduce them:

1. **Navbar Navigation** - Proper scroll handling and section navigation
2. **Mobile Menu** - Logo replaces "Meny" text, close button works correctly
3. **Horizontal Scrolling** - Fixed with overflow-x-hidden on all sections
4. **Images for Production** - Moved to public/ folder for correct build paths
5. **Email Contact** - Updated to info@oscarjohansson.eu

## Git Workflow

### Current Branch
- **Main Branch:** `main`
- Working on: `main`

### Commit Messages
- Use descriptive commit messages
- Reference what was fixed/added
- Keep messages concise (under 72 chars for first line)

### Before Pushing
1. Test build locally: `npm run build`
2. Preview production build: `npm run preview`
3. Verify mobile menu functionality
4. Check responsive behavior
5. Ensure TypeScript compiles without errors

## Deployment

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build Process
1. Install dependencies: `npm install`
2. Build: `npm run build` (outputs to `dist/`)
3. Deploy: Vercel auto-deploys from git push to main

### Preview Before Deploy
```bash
npm run build
npm run preview
```
Visit http://localhost:4173 to test production build locally.

### Custom Domain (oscarjohansson.eu)
Domain is connected via Strato DNS. DNS settings:
- **A record:** `oscarjohansson.eu` → `76.76.21.21`
- **CNAME:** `www.oscarjohansson.eu` → `cname.vercel-dns.com`

### Deploy via CLI
```bash
npx vercel --prod
```

### Environment Variables
- **GEMINI_API_KEY:** Configured in vite.config.ts (not currently used in components)
- Stored in .env.local (not committed to git) and in Vercel dashboard

## Support & Feedback

For issues with this website's codebase or suggestions for improvements, contact Oscar Johansson at info@oscarjohansson.eu.

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS**
