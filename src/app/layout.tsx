import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { SidebarNavLayout } from '@/components/layouts/sidebar-nav';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { WalletAdapterProvider } from '@/components/providers/wallet-adapter';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

const SITE_URL = 'https://rnxj.dev';
const TWITTER_HANDLE = '@rnxj';
const SITE_NAME = 'Reuel Nixon';
const SITE_DESCRIPTION =
  'A curated collection of my personal projects and experiments in web development, blockchain, and software engineering.';
const SITE_IMAGE = `${SITE_URL}/og.png`;

// Viewport export is a Next.js 14 feature for viewport meta tags
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Reuel Nixon',
    'Reuel',
    'Nixon',
    'Software Engineer',
    'Full Stack Developer',
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'Blockchain',
    'Web3',
    'Portfolio',
    'Projects',
    'Developer Portfolio',
  ],
  authors: [{ name: 'Reuel', url: SITE_URL }],
  creator: 'Reuel',
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [SITE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'your-google-site-verification-id', // Add your Google verification ID
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  other: {
    'msapplication-TileColor': '#000000',
  },
};

// Define the JSON-LD schema
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Reuel Nixon',
  givenName: 'Reuel',
  familyName: 'Nixon',
  url: SITE_URL,
  sameAs: ['https://twitter.com/rnxj', 'https://github.com/rnxj', 'https://linkedin.com/in/rnxj'],
  jobTitle: 'Software Engineer',
  description: SITE_DESCRIPTION,
  image: `${SITE_URL}/avatar.png`,
  email: 'contact@rnxj.dev',
  alumniOf: {
    '@type': 'Organization',
    name: 'Vellore Institute of Technology',
  },
  knowsAbout: [
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'Blockchain',
    'Web3',
    'Full Stack Development',
    'Backend Development',
    'Golang',
    'Python',
    'Rust',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <WalletAdapterProvider>
            <SidebarNavLayout>{children}</SidebarNavLayout>
            <Toaster />
          </WalletAdapterProvider>
        </ThemeProvider>
        <Analytics />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
