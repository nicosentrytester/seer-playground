import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.SENTRY_DSN ??
    "https://2cf2a387d0d856d8757e05d435e66ec5@o4511967428280320.ingest.us.sentry.io/4511967465046016",

  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  enableLogs: true,
});
