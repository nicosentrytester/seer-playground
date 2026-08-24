import * as Sentry from "@sentry/nextjs";

class SentryExampleAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

export const dynamic = "force-dynamic";

export function GET() {
  Sentry.captureMessage("Hit /api/debug — about to throw", "info");
  throw new SentryExampleAPIError(
    "This error is raised on the server from /api/debug for Sentry + Seer to analyze.",
  );
}
