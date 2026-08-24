"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

class SentryExampleFrontendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentryExampleFrontendError";
  }
}

export default function DebugPage() {
  const [sent, setSent] = useState<string | null>(null);

  async function throwOnServer() {
    const res = await fetch("/api/debug");
    if (!res.ok) setSent("Server threw — check your Sentry Issues stream.");
  }

  function throwOnClient() {
    Sentry.startSpan({ name: "Example Frontend Span", op: "test" }, () => {
      throw new SentryExampleFrontendError(
        "This error is thrown in the browser for Sentry + Seer to analyze.",
      );
    });
  }

  return (
    <main style={{ maxWidth: 640, margin: "80px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>Debug / trigger a Sentry error</h1>
      <p>
        Use these to send a test event to Sentry. Once it lands, open the issue
        and let Seer (root-cause + autofix) analyze it.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button onClick={throwOnClient} style={btn}>
          Throw client error
        </button>
        <button onClick={throwOnServer} style={btn}>
          Throw server error
        </button>
      </div>
      {sent && <p style={{ marginTop: 16 }}>{sent}</p>}
      <p style={{ marginTop: 32 }}>
        <a href="/">← back home</a>
      </p>
    </main>
  );
}

const btn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "1px solid #6c5fc7",
  background: "#6c5fc7",
  color: "white",
  cursor: "pointer",
};
