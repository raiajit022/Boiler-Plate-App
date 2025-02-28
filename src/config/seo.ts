export const siteConfig = {
  name: 'My Next.js App',
  description: 'A modern web application built with Next.js',
  url: 'https://my-nextjs-app.com',
  ogImage: 'https://my-nextjs-app.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/mynextjsapp',
    github: 'https://github.com/username/my-nextjs-app',
  },
  creator: 'Your Name',
};

export type SiteConfig = typeof siteConfig;

export const defaultMetadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'TypeScript', 'Web Development'],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};
