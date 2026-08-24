"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main style={{ maxWidth: 640, margin: "80px auto", padding: 24, fontFamily: "system-ui" }}>
      <h2>This route crashed — the error was sent to Sentry.</h2>
      <p style={{ color: "#666" }}>{error.message}</p>
      <button onClick={reset} style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}>
        Try again
      </button>
    </main>
  );
}
