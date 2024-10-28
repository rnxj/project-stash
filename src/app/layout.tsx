import type { Metadata } from 'next';
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
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: "Reuel's Project Stash",
  description:
    'A curated collection of my personal projects and experiments, showcasing a journey of learning, creativity, and development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <WalletAdapterProvider>
            <SidebarNavLayout>{children}</SidebarNavLayout>
            <Toaster />
          </WalletAdapterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
