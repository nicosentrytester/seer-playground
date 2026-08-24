import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  // Set SENTRY_ORG and SENTRY_PROJECT (and SENTRY_AUTH_TOKEN for
  // source map upload) in the environment / your CI provider.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  widenClientFileUpload: true,

  // Proxy Sentry requests through the app to dodge ad-blockers.
  tunnelRoute: "/monitoring",

  silent: !process.env.CI,
});
