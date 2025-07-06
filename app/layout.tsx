import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'DreamForge - AI Vision & Language Platform',
    template: '%s | DreamForge'
  },
  description: 'Transform visual understanding with AI. Fast, free, and intelligent image analysis powered by advanced vision-language models.',
  keywords: ['AI', 'Vision', 'Language', 'Image Analysis', 'Machine Learning'],
  authors: [{ name: 'DreamForge Team' }],
  creator: 'DreamForge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dreamforge.ai',
    title: 'DreamForge - AI Vision & Language Platform',
    description: 'Transform visual understanding with AI. Fast, free, and intelligent image analysis.',
    siteName: 'DreamForge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DreamForge - AI Vision & Language Platform',
    description: 'Transform visual understanding with AI. Fast, free, and intelligent image analysis.',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-black">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
} 