# Sales Fulfillment 3PL Website

A production-ready Next.js landing page for **Sales Fulfillment 3PL** with futuristic UI, scroll animations, glass cards, SEO metadata, and a quote form API route designed to send leads by email through Resend.

## What is included

- Next.js App Router project
- React 19-ready component structure
- Tailwind CSS styling
- Framer Motion scroll/floating animations
- Mobile-responsive layout
- SEO metadata, robots, sitemap, and JSON-LD schema
- Quote form with validation, honeypot spam protection, and email API route
- Vercel-ready deployment setup

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quote form email setup

The quote form is already wired to `/api/quote`. To make it send real emails, add these environment variables:

```bash
RESEND_API_KEY=your_resend_api_key
LEAD_EMAIL=your-email@example.com
RESEND_FROM_EMAIL="Sales Fulfillment 3PL <quotes@yourdomain.com>"
NEXT_PUBLIC_SITE_URL=https://salesfulfillment3pl.com
```

Recommended: use Resend and verify your domain before using a branded sender email.

## Deploy to Vercel

1. Create a GitHub repository and upload this project.
2. Go to Vercel and import the repository.
3. Add the environment variables above in Vercel Project Settings → Environment Variables.
4. Deploy.
5. Add your custom domain inside Vercel Project Settings → Domains.

## Files to edit next

- `app/page.tsx` — main website content and layout
- `app/layout.tsx` — SEO metadata
- `app/api/quote/route.ts` — email lead handling
- `app/globals.css` — global visual styling and animations

## Notes

The form will show a configuration error until `RESEND_API_KEY` and `LEAD_EMAIL` are added in Vercel. Once those are set, submissions will email the lead inbox and use the customer's email as the reply-to address.
