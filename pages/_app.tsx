import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { initSentry } from '../lib/sentry';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  initSentry();
  return (
    <SessionProvider session={session as any}>
      <Component {...pageProps} />
    </SessionProvider>
  );
} 