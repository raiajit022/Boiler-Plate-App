import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import SEO from '@/config/seo';
import { ThemeProvider } from '@/components/theme-provider';
import { AnimatePresence } from 'framer-motion';

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <DefaultSeo {...SEO} />
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </SessionProvider>
  );
}
