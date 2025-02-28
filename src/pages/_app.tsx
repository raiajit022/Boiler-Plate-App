import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { DefaultSeo } from 'next-seo';
import SEO from '@/config/seo';
import { ThemeProvider } from '@/components/theme-provider';
import { AnimatePresence } from 'framer-motion';

export default function App({ 
  Component, 
  pageProps: { session, initialSession, ...pageProps } 
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionProvider session={session}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
        <ThemeProvider>
          <DefaultSeo {...SEO} />
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
      </SessionContextProvider>
    </SessionProvider>
  );
}
