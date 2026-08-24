import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.replayIntegration()],
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
