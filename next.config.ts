import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {};

export default withSentryConfig(nextConfig, {
  // Set SENTRY_ORG and SENTRY_PROJECT (and SENTRY_AUTH_TOKEN for
  // source map upload) in the environment / your CI provider.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
