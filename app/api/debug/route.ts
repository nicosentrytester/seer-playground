import * as Sentry from "@sentry/nextjs";
import { NextRequest } from "next/server";

class SentryDemoServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentryDemoServerError";
  }
}

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") ?? "server-generic";
  Sentry.setTag("demo.error_type", type);
  Sentry.captureMessage(`Hit /api/debug?type=${type} — about to throw`, "info");

  switch (type) {
    case "server-type": {
      const value = null as unknown as { length: number };
      return Response.json({ length: value.length });
    }
    case "server-db":
      throw new SentryDemoServerError(
        "Simulated DB failure: connection to postgres://primary timed out after 5000ms",
      );
    case "server-generic":
    default:
      throw new SentryDemoServerError(
        `This server error was raised on demand from /api/debug (type=${type}) for Sentry + Seer to analyze.`,
      );
  }
}
