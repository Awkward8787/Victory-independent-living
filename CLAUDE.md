# Victory Independent Living — Project Guide

## About This Project
Victory Independent Living (Victory IL) is a housing intake and landlord recruitment web app serving **Valdosta, Georgia**.

**Mission:** Help residents who cannot afford traditional housing find affordable rooms, shared housing, and landlords willing to work with them — similar to how PadSplit operates but locally focused on Valdosta.

**Business Model (Profit-Driven):**
- **Tenants** pay a small service/placement fee when successfully matched with housing
- **Landlords/Property Owners** list for free — Victory IL earns on the tenant side
- Revenue comes from successful placements, not upfront fees from landlords
- Future: Featured listings, premium landlord subscriptions, referral partnerships

**Founders:** Valisa Jones and Anthony Jones

---

## Tech Stack
| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI framework |
| Vite 6 | Build tool (dev server on port 3000) |
| React Router v7 | Client-side routing (HashRouter for static hosting) |
| Tailwind CSS (CDN) | Styling — brand colors defined in `index.html` |
| Lucide React | Icons |
| Formspree | Form submissions → email (no backend needed) |
| Cloudinary | Image hosting (logo + hero images) |

**Hosting:** Any static host (Hostinger, GitHub Pages, Netlify). Uses HashRouter so no server config needed.

---

## Project Structure
```
/
├── index.html            # ⭐ Tailwind CDN config, brand colors, fonts, animations
├── index.tsx             # React root + ErrorBoundary
├── App.tsx               # Route definitions
├── config.ts             # ⭐ ALL site-wide config — update this before deploying
├── types.ts              # TypeScript interfaces
├── index.css             # Minimal global styles
├── vite.config.ts        # Build/dev config
├── package.json
├── CLAUDE.md             # This file — project guide for AI and developers
│
├── components/
│   ├── Navbar.tsx        # Sticky top nav with mobile hamburger menu
│   ├── Footer.tsx        # Site footer with links and contact info
│   ├── Layout.tsx        # Wraps all pages with Navbar + Footer
│   └── FormCtaCard.tsx   # Reusable CTA card linking to external forms
│
├── pages/
│   ├── HomePage.tsx      # Main landing page (PadSplit-inspired)
│   ├── ApplyPage.tsx     # 3-step housing intake form for tenants
│   ├── PartnersPage.tsx  # Landlord/property owner recruitment page
│   ├── ContactPage.tsx   # Contact info + direct message form
│   └── ResourcesPage.tsx # Static Valdosta community resource directory
│
└── services/             # Empty — AI/Gemini features were removed
```

---

## Key Configuration (config.ts)
**Update these before going live:**

| Variable | What It Is |
|----------|-----------|
| `CONTACT_PHONE` | Primary phone: (229) 444-3576 |
| `CONTACT_PHONE_ALT` | Secondary phone: (229) 946-8905 |
| `CONTACT_EMAIL` | Office email |
| `APPLY_FORM_ENDPOINT` | Formspree URL for tenant applications |
| `PARTNER_FORM_ENDPOINT` | Formspree URL for landlord submissions |
| `PLACEMENT_FEE` | Fee shown to tenants on Apply page — update when pricing is set |

---

## Setting Up Form Submissions (Formspree)
Forms currently fall back gracefully if not configured. To go live:
1. Create free account at **https://formspree.io**
2. Create two forms: "Housing Intake" and "Partner/Landlord"
3. Copy each endpoint URL (looks like `https://formspree.io/f/xwkdjbla`)
4. Paste into `config.ts` as `APPLY_FORM_ENDPOINT` and `PARTNER_FORM_ENDPOINT`
5. Formspree will send form submissions to your email

---

## Brand Colors (Sky Blue — defined in index.html)
| Token | Hex | Use |
|-------|-----|-----|
| brand-50 | #f0f9ff | Light backgrounds |
| brand-100 | #e0f2fe | Subtle highlights |
| brand-200 | #bae6fd | Borders |
| brand-300 | #7dd3fc | Light accents |
| brand-400 | #38bdf8 | Mid accents |
| brand-500 | #0ea5e9 | Buttons, icons |
| brand-600 | #0284c7 | Primary button bg |
| brand-700 | #0369a1 | Button hover |
| brand-800 | #075985 | Dark text/elements |
| brand-900 | #0c4a6e | Darkest brand |

---

## Pages Overview

### Home (`/`)
PadSplit-inspired landing page. Sections:
1. Hero — headline + dual CTAs (tenant / landlord) + phone numbers
2. Two Paths — tenant card vs. landlord card
3. How It Works — 3 steps
4. What We Help With — feature list + image
5. Community Resources Preview — links to /resources
6. Privacy & Trust disclaimer

### Apply (`/apply`)
3-step form for tenants:
- Step 1: Personal info (name, email, phone)
- Step 2: Housing needs (budget, move-in date, voucher status, notes)
- Step 3: Review + submit
Submits to Formspree. Shows confirmation on success.

### Partners (`/partners`)
Landlord recruitment page:
- Value props for listing
- FAQ section
- Contact form for property details
Submits to Formspree.

### Contact (`/contact`)
- Both phone numbers
- Email
- Message form (opens mailto: as fallback)

### Resources (`/resources`)
Static directory of Valdosta-area community resources organized by category:
- Housing Assistance
- Food & Nutrition
- Transportation
- Healthcare
- Financial & Benefits
- Employment

---

## Deployment Steps
```bash
npm install
npm run build
# Upload contents of /dist to your hosting public_html
```

---

## Current TODOs
- [ ] Set up Formspree and update `APPLY_FORM_ENDPOINT` + `PARTNER_FORM_ENDPOINT` in config.ts
- [ ] Set `PLACEMENT_FEE` to actual dollar amount when pricing is decided
- [ ] Update `CONTACT_EMAIL` to real office email
- [ ] Add real team/office photo to homepage (replace Cloudinary placeholder)
- [ ] Verify both phone numbers are active: (229) 444-3576 and (229) 946-8905
- [ ] Add testimonials section once you have success stories from placed tenants
- [ ] Set up Google Analytics for traffic tracking
- [ ] Consider adding a listings/search page as the business grows
- [ ] Add a FAQ page covering common tenant questions

---

## What's NOT in This Codebase
- ❌ AI / Gemini features (removed — use Resources page instead)
- ❌ Backend / database (all static — use Formspree for forms)
- ❌ Payment processing (future: Stripe integration for service fees)
- ❌ User accounts / login (future feature)
- ❌ Real-time listings / search (future: consider Supabase or Airtable)
