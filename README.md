# Acropolis The Mall

A modern, full-stack website for **Acropolis The Mall** — a premium commercial real-estate property in India. Built with Next.js 16 (App Router), Prisma 7, NextAuth v5, and shadcn/ui.

## Features

### Public Pages

- **Home** — Hero section, project highlights, scroll-reveal animations
- **About** — Project overview and vision
- **Commercial Spaces** — Available retail and office spaces
- **Floor Plans** — Interactive floor-plan browser with filtering
- **Amenities** — Detailed amenities showcase
- **Portfolio** — Developer portfolio and past projects
- **Gallery** — Image gallery with lightbox viewer and category filtering
- **Location** — Interactive map and neighbourhood details
- **RERA** — Registration details, verification link, and certificate download
- **Contact** — Contact form with validation
- **Enquiry** — Enquiry submission form
- **FAQ** — Frequently asked questions
- **Privacy Policy** / **Terms** — Legal pages

### Admin Dashboard

- **Dashboard** — Stats overview and recent activity
- **Enquiries** — CRUD, search, status management, CSV export
- **Floor Plans** — CRUD with image upload
- **Gallery** — CRUD with drag-and-drop reorder and image upload
- **Portfolio** — CRUD with image upload
- **Settings** — Site configuration management

### Technical

- SEO-optimised metadata on every page, JSON-LD structured data, `robots.txt`, `sitemap.xml`
- Scroll-reveal animations with `prefers-reduced-motion` support
- Responsive design with mobile bottom bar and WhatsApp floating button
- MIME-validated file uploads
- JWT-based session with NextAuth v5 credentials provider

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3.4 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI + CVA) |
| ORM | Prisma 7.10.0 |
| Database | PostgreSQL 16 |
| Auth | NextAuth v5 beta.32 (Credentials + JWT) |
| Forms | React Hook Form + Zod v4 |
| Icons | Lucide React |
| Notifications | Sonner |

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **PostgreSQL 16** (Docker recommended)
- **npm** (or pnpm/yarn)

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd acropolis-mall
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start PostgreSQL

Using Docker:

```bash
docker run -d \
  --name acropolis-postgres \
  -e POSTGRES_USER=acropolis \
  -e POSTGRES_PASSWORD=acropolis_secret \
  -e POSTGRES_DB=acropolis_mall \
  -p 5432:5432 \
  postgres:16-alpine
```

Or start an existing container:

```bash
docker start acropolis-postgres
```

### 4. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```env
DATABASE_URL="postgresql://acropolis:acropolis_secret@localhost:5432/acropolis_mall"
AUTH_SECRET="your-random-secret-string-here"
```

Generate a secret with `openssl rand -base64 32`.

### 5. Run database migrations and seed

```bash
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | Random string for NextAuth JWT signing |
| `AUTH_TRUST_HOST` | Production | Set to `true` for Vercel/deployed environments |
| `NEXT_PUBLIC_PHONE` | No | Contact phone number (hidden if empty) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | WhatsApp number for floating button (hidden if empty) |
| `NEXT_PUBLIC_EMAIL` | No | Contact email address (hidden if empty) |
| `NEXT_PUBLIC_MAP_URL` | No | Google Maps embed URL for the Location page |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL for sitemap/robots (defaults to `https://acropolisthemall.com`) |

## Project Structure

```
acropolis-mall/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed script (admin user + sample data)
│   └── migrations/            # Migration history
├── public/
│   ├── images/                # Static images (hero, floor plans, RERA)
│   ├── documents/             # PDFs (RERA certificate)
│   └── uploads/               # Admin-uploaded files (gitignored)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── spaces/            # Commercial spaces
│   │   ├── floor-plans/       # Interactive floor plans
│   │   ├── amenities/         # Amenities page
│   │   ├── portfolio/         # Developer portfolio
│   │   ├── gallery/           # Image gallery
│   │   ├── location/          # Map & location
│   │   ├── rera/              # RERA compliance
│   │   ├── contact/           # Contact page
│   │   ├── enquiry/           # Enquiry form
│   │   ├── faq/               # FAQ page
│   │   ├── privacy-policy/    # Privacy policy
│   │   ├── terms/             # Terms & conditions
│   │   ├── admin/
│   │   │   ├── login/         # Admin login
│   │   │   └── (dashboard)/   # Admin dashboard (protected)
│   │   │       ├── page.tsx   # Dashboard overview
│   │   │       ├── enquiries/
│   │   │       ├── floor-plans/
│   │   │       ├── gallery/
│   │   │       ├── portfolio/
│   │   │       └── settings/
│   │   └── api/               # API routes (public + admin)
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── layout/            # Header, footer, WhatsApp button, mobile bar
│   │   ├── home/              # Home page components
│   │   ├── admin/             # Admin dashboard components
│   │   └── ...                # Page-specific components
│   └── lib/
│       ├── prisma.ts          # Prisma client singleton
│       ├── auth.ts            # NextAuth configuration
│       ├── settings.ts        # Environment-based settings
│       ├── seo.ts             # Metadata helpers
│       └── utils.ts           # Utility functions (cn, formatDate)
├── prisma7.config.ts          # Prisma 7 configuration
├── .env.example               # Environment variable template
└── package.json
```

## Admin Access

The admin panel is available at `/admin/login`.

**Default credentials (dev only):**

- Email: `admin@acropolismall.com`
- Password: `admin123`

These are created by the seed script. **Change the password in production.**

## Database

The project uses **Prisma 7** with the `PrismaPg` adapter. The Prisma client is generated to `src/generated/prisma/` (gitignored).

Common commands:

```bash
# Generate client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name <migration-name>

# Deploy migrations (production)
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Re-seed the database
npx tsx prisma/seed.ts
```

## Deployment (Vercel)

1. Push to a Git repository (GitHub/GitLab/Bitbucket)
2. Import the project on [Vercel](https://vercel.com)
3. Set environment variables in the Vercel dashboard:
   - `DATABASE_URL` — Use a hosted PostgreSQL service (e.g., Neon, Supabase, Railway)
   - `AUTH_SECRET` — Generate a new secret
   - `AUTH_TRUST_HOST=true`
4. Vercel will run `prisma migrate deploy` automatically via the `postinstall` script
5. Deploy

> **Note:** The `public/uploads/` directory is ephemeral on Vercel. For production file uploads, use external storage (S3, Cloudinary, etc.).

## RERA Compliance

The site includes a dedicated RERA page displaying:

- Registration number and validity dates
- Link to the official government verification portal
- Downloadable RERA approval certificate (PDF)

RERA details are managed through the database (`rera_registrations` table) and can be updated via the admin panel or seed data.

## License

MIT
