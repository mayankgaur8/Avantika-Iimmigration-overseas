# Avantika Immigration & Overseas

Operational Next.js platform for immigration consulting with lead capture, eligibility scoring, booking workflow, newsletter/contact intake, CRM sync seam, transactional email, and a protected admin console.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Prisma ORM + PostgreSQL
- Zod validation + honeypot/rate-limit/origin checks
- Pluggable email providers: Resend / SendGrid / SMTP
- Pluggable CRM providers: HubSpot / Zoho / generic webhook

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template and fill secrets:

```bash
cp .env.example .env.local
```

3. Generate Prisma client and run migration:

```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Optional seed for first admin user:

```bash
npm run prisma:seed
```

5. Start development:

```bash
npm run dev
```

## Production commands

```bash
npm run lint
npm run build
npm run start
```

For CI/CD deploy pipelines (without interactive migration prompts):

```bash
npm run prisma:generate
npm run prisma:deploy
npm run build
```

## Core environment variables

Required for runtime:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `ADMIN_SESSION_SECRET`
- `EMAIL_FROM`
- `EMAIL_TO_ADMIN`

Admin bootstrap options:

- `ADMIN_BOOTSTRAP_TOKEN`: enables one-time bootstrap endpoint.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: used by `prisma:seed`.

Email provider routing:

- `EMAIL_PROVIDER`: `resend`, `sendgrid`, `smtp`, or unset for no-op.
- `RESEND_API_KEY` or `SENDGRID_API_KEY` or SMTP variables.

CRM provider routing:

- `CRM_PROVIDER`: `hubspot`, `zoho`, `webhook`, or `none`.
- Relevant provider keys plus `CRM_WEBHOOK_URL` when using webhook mode.

Security and anti-spam:

- `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` for CAPTCHA.

## Admin bootstrap flow

1. Set `ADMIN_BOOTSTRAP_TOKEN`.
2. Call `POST /api/admin/bootstrap` once with:
	- `name`
	- `email`
	- `password`
	- `bootstrapToken`
3. Remove or rotate `ADMIN_BOOTSTRAP_TOKEN` after first admin is created.
4. Login via `/admin/login`.

## Available operational endpoints

- `POST /api/leads`
- `POST /api/eligibility`
- `POST /api/newsletter`
- `POST /api/contact`
- `POST /api/bookings`
- `GET /api/health`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `POST /api/admin/bootstrap`
- `PATCH /api/admin/leads/:id`

## Deployment checklist

1. Configure all required env vars in host platform.
2. Run `npm run prisma:deploy` against production database.
3. Validate `GET /api/health` after deploy.
4. Verify email sending with selected provider.
5. Verify CRM sync with configured provider.
6. Smoke test forms and admin login/update workflows.
7. Confirm analytics events in GA/Pixel debug tools.

## Architecture notes

- Shared backend utilities live in `lib/server` for auth, monitoring, CRM, email, and security.
- Admin area is server-rendered and protected through session checks in secure layout.
- Content remains modular in `lib/data` to support future CMS migration with minimal page rewrites.
