# Next.js SaaS Boilerplate

A modern, full-featured SaaS boilerplate built with Next.js, featuring authentication, payments, and analytics.

## Tech Stack

- **Framework**: Next.js 15.2.0
- **Authentication**: NextAuth.js with Google & Email providers
- **Database**: MongoDB & Prisma
- **Payment Processing**: Stripe
- **Authentication & Storage**: Supabase
- **Analytics**: Segment & Mixpanel
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: SWR
- **UI Components**: Framer Motion
- **TypeScript**: Yes

## Core Features

- 🔐 Authentication (NextAuth.js, Supabase)
- 💳 Subscription payments (Stripe)
- 📊 Analytics tracking (Segment, Mixpanel)
- 📧 Email handling (Nodemailer)
- 🗄️ Database integration (MongoDB, Prisma)
- 📝 Form validation
- 🎨 Responsive UI components
- 🔍 SEO optimization

## Project Structure

```
src/
├── components/         # Reusable UI components
├── lib/               # Core functionality
│   ├── analytics.ts   # Analytics integration
│   ├── auth.ts        # Authentication setup
│   ├── db.ts          # Database client
│   ├── email.ts       # Email service
│   ├── logger.ts      # Logging utility
│   ├── mongodb.ts     # MongoDB configuration
│   ├── stripe.ts      # Stripe integration
│   └── supabase.ts    # Supabase client
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
- Authentication (NextAuth, Google OAuth)
- Database connections (MongoDB)
- Supabase credentials
- Stripe API keys
- Analytics tokens (Segment, Mixpanel)
- Email service configuration

5. Run the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup` - Initial project setup
- `npm run security-check` - Check for security vulnerabilities

## Environment Variables

Required environment variables:

```bash
# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database
MONGODB_URI=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

# Analytics
NEXT_PUBLIC_SEGMENT_WRITE_KEY=
NEXT_PUBLIC_MIXPANEL_TOKEN=
```

## Authentication

The project supports multiple authentication methods:
- Google OAuth
- Magic Links (Email)
- NextAuth.js integration

## Payment Integration

Stripe integration is set up for:
- Subscription management
- One-time payments
- Customer portal
- Webhook handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.