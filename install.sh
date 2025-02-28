#!/bin/bash

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up Tailwind CSS..."
npx tailwindcss init -p

echo "📝 Creating environment variables file..."
if [ ! -f .env.local ]; then
  cat > .env.local << EOL
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
EOL
  echo "✅ .env.local file created. Please fill in the required values."
else
  echo "⚠️ .env.local file already exists. Skipping creation."
fi

echo "🚀 Setup complete! Run 'npm run dev' to start the development server."
