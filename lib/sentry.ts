import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  if (Sentry.getCurrentHub().getClient()) return; // already init
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1,
  });
} 