styling.md

To capture that same modern, clean, professional vibe you see on OpenAI’s and Node.js’s websites, let’s layer in design tokens, layout patterns, components, and micro-interactions. Here’s a detailed front-end outline:

⸻

1. Design Foundations

1.1. Design Tokens
	•	Color palette:
	•	Primary: deep charcoal (#111827) → white (#FFFFFF) for light mode
	•	Accent: vibrant blue (#2563EB) → teal (#14B8A6) or green (#22C55E) for highlights
	•	Neutrals: grays for backgrounds and borders (100, 200, 300 levels)
	•	Typography:
	•	Headings: Inter or Clash Display, weight 700
	•	Body: Inter or Source Sans Pro, weight 400
	•	Scale: H1 3rem, H2 2.25rem, H3 1.875rem; Body 1rem; Caption 0.875rem
	•	Spacing: 4px grid → 8, 16, 24, 32, 40, 48px utility classes
	•	Radii & Elevation:
	•	Border-radius: 4px (sm), 8px (md), 16px (lg)
	•	Shadows: subtle (“0 1px 3px rgba(0,0,0,0.1)”) for cards, deeper on modals

1.2. Theming & Dark Mode
	•	Tailwind’s @media (prefers-color-scheme) + class="dark" on <html>
	•	Swap background, text, and accent shades seamlessly
	•	Persist user choice in localStorage

⸻

2. Global Layout & Navigation

2.1. Sticky Top Nav
	•	Logo left, centered primary links (Home, Docs, Pricing), right utilities (Login, Theme Toggle)
	•	Transparent → solid background on scroll (backdrop-blur effect)
	•	Mobile: hamburger → slide-in drawer

2.2. Footer
	•	Four-column grid: Products, Resources, Company, Social
	•	Simple text links, small social icons (LinkedIn, GitHub, Twitter)
	•	Bottom bar with copyright

⸻

3. Home Page Components

3.1. Hero Section
	•	Full-height viewport, split into two columns on desktop:
	•	Left: H1 + H2 + CTA buttons (“Try Free”, “Demo as Guest”)
	•	Right: auto-playing, muted looping background animation or sculptural SVG
	•	Scroll-down indicator arrow
	•	Micro-interaction: button hover → scale(1.05) + drop shadow

3.2. Feature Highlights
	•	3 or 4 feature cards in a responsive grid
	•	Each card: icon (Lottie or SVG), heading, 2–3 line description
	•	On hover: card elevates + icon color animates

3.3. “How It Works” Walkthrough
	•	3 columns with numbered steps
	•	Each step: circle with step number, short title, paragraph
	•	Illustrative SVG or simple animation per step
	•	Connector line animation on scroll

3.4. Social Proof / Logos
	•	Horizontal carousel of partner or client logos in grayscale, auto-scroll

⸻

4. Authentication & Onboarding UI

4.1. Modal-Based Auth Flow
	•	Centered modal with tab toggle (Sign In / Sign Up)
	•	Large OAuth buttons styled like Node.js (rounded, icon + text)
	•	“Continue as Guest” ghost button below
	•	Slide-up/onboarding tour prompt after first auth

4.2. Onboarding Tour
	•	Use a library like React Joyride
	•	Highlights key UI elements with tooltip balloons and next/skip controls

⸻

5. AI Playground / Demo

5.1. Split-Panel Console Layout
	•	Left: image uploader or gallery carousel (drag-and-drop area)
	•	Right: chat-style panel with prompt input at bottom
	•	Tabs at top for modes: Caption, Q&A, Detect, Point
	•	Animated typing indicator for live streaming results

5.2. Image Overlay Components
	•	Use an HTML5 <canvas> or SVG overlay on the uploaded image
	•	Bounding boxes styled with semi-transparent fills + labels
	•	Pointer mode: animated dot pulses

5.3. Feedback & Settings Bar
	•	Under each result: inline thumbs up/down icons
	•	Collapsible “Advanced settings” section with sliders (Tailwind range inputs)
	•	Toggle switch to include/exclude Claude API

⸻

6. Pricing & Plans

6.1. Plan Cards
	•	3 columns, equal height, feature list with checkmarks
	•	“Most popular” badge on middle card
	•	CTA button expands slightly on hover, changes color accent

6.2. Billing Toggle
	•	Switch between Monthly/Yearly pricing updates numbers via React state
	•	Subtle animation on price change

6.3. FAQ Accordion
	•	Accordion items with plus/minus icons
	•	Smooth expand/collapse transitions

⸻

7. Docs & Math Page

7.1. Sidebar Navigation
	•	Fixed left sidebar with anchor links, collapsible on mobile
	•	Active section highlight indicator
	•	Top search box to filter headings

7.2. Content Styling
	•	Code blocks with Prism.js → syntax highlighting matching theme
	•	Diagrams inline (SVG or embedded images) with captions
	•	Table of reward-function parameters with sticky header

⸻

8. Micro-Interactions & Polishing
	•	Page transitions: fade/slide via Framer Motion for route changes
	•	Button ripples: subtle Material-style effect on click
	•	Lazy loading: images with blur placeholder (Next.js <Image> component)
	•	Lottie animations: for hero background, icons, spinners
	•	Accessibility: focus outlines, ARIA labels, high contrast mode

⸻

Tech Stack & Tools
	•	Next.js 13+ with the app/ directory
	•	Tailwind CSS + Tailwind Typography + Headless UI (for modals, menus)
	•	Framer Motion for animations
	•	React Joyride (onboarding)
	•	Heroicons or custom SVG icon library
	•	Prism.js (docs code highlighting)
	•	Storybook for developing and showcasing reusable UI components

⸻

By following these guidelines and component patterns, you’ll achieve that crisp, professional look of OpenAI and Node.js—while maintaining a fully Node.js-powered, React/Tailwind codebase that’s eminently deployable on Vercel.