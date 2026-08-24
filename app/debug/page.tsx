"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

class SentryDemoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentryDemoError";
  }
}

type ClientError = { value: string; label: string; run: () => void };

const CLIENT_ERRORS: ClientError[] = [
  {
    value: "typeerror",
    label: "Client · TypeError — read property of null",
    run: () => {
      const obj = null as unknown as { deep: { value: number } };
      console.log(obj.deep.value);
    },
  },
  {
    value: "reference",
    label: "Client · ReferenceError — call undefined function",
    run: () => {
      (window as unknown as { __missing__: () => void }).__missing__();
    },
  },
  {
    value: "rejection",
    label: "Client · Unhandled promise rejection",
    run: () => {
      void Promise.reject(new SentryDemoError("Unhandled promise rejection demo"));
    },
  },
  {
    value: "manual",
    label: "Client · Manual Sentry.captureException",
    run: () => {
      Sentry.captureException(new SentryDemoError("Manual captureException demo"));
    },
  },
  {
    value: "custom",
    label: "Client · Custom thrown error",
    run: () => {
      throw new SentryDemoError("Custom client error demo");
    },
  },
];

const SERVER_ERRORS = [
  { value: "server-generic", label: "Server · 500 — thrown Error" },
  { value: "server-type", label: "Server · TypeError (null.length)" },
  { value: "server-db", label: "Server · Simulated DB failure" },
];

const ALL = [
  ...CLIENT_ERRORS.map((e) => ({ ...e, kind: "client" as const })),
  ...SERVER_ERRORS.map((e) => ({ ...e, kind: "server" as const })),
];

export default function DebugPage() {
  const [selected, setSelected] = useState(ALL[0].value);
  const [status, setStatus] = useState<string | null>(null);
  const [renderCrash, setRenderCrash] = useState<string | null>(null);

  if (renderCrash) {
    throw new SentryDemoError(renderCrash);
  }

  async function emit() {
    const entry = ALL.find((e) => e.value === selected);
    if (!entry) return;
    setStatus(null);

    if (entry.kind === "server") {
      const res = await fetch(`/api/debug?type=${entry.value}`);
      setStatus(
        res.ok
          ? "Server responded OK (unexpected)."
          : `Server threw (${res.status}). Check your Sentry Issues stream.`,
      );
      return;
    }

    if (entry.value === "custom") {
      // Throw on next render so the route error boundary captures it.
      setRenderCrash("Custom client error demo (render boundary)");
      return;
    }

    entry.run();
    setStatus("Client error emitted. Check your Sentry Issues stream.");
  }

  return (
    <main style={{ maxWidth: 640, margin: "80px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>Emit a Sentry error</h1>
      <p>
        Pick an error type and send it to Sentry. Once it lands, open the issue
        and let Seer (root-cause + autofix) analyze it.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 8, minWidth: 320, fontSize: 14 }}
        >
          {ALL.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
        <button
          onClick={emit}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #6c5fc7",
            background: "#6c5fc7",
            color: "white",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Emit error
        </button>
      </div>

      {status && <p style={{ marginTop: 16, color: "#444" }}>{status}</p>}

      <p style={{ marginTop: 32 }}>
        <a href="/">← back home</a>
      </p>
    </main>
  );
}
