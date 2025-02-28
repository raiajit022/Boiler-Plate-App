# My Next.js App

## Setup

To set up this project:

## Features

- Next.js 13 with App Router
- Supabase authentication
- Stripe payments
- Tailwind CSS for styling
- TypeScript support
- Form handling with React Hook Form
- API validation with Zod
- SEO optimized with Next SEO

## Installation

### Automatic Installation

Run the install script:

```bash
chmod +x install.sh
./install.sh
```

### Manual Installation

1. Install dependencies:

```bash
npm install
```

2. Set up Tailwind CSS:

```bash
npx tailwindcss init -p
```

3. Create a `.env.local` file in the root directory with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Mailgun
MAILGUN_API_KEY=
MAILGUN_DOMAIN=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
npm run build
npm run start
```

## Security Fixes

If you encounter security vulnerabilities related to `mailgun-js` or other dependencies, you can run the fix script:
```