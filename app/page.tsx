export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "80px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>seer-playground</h1>
      <p>
        A Next.js app wired to Sentry, ready for Seer (Sentry&apos;s AI
        root-cause &amp; autofix agent).
      </p>
      <ol style={{ lineHeight: 1.9 }}>
        <li>
          Set <code>NEXT_PUBLIC_SENTRY_DSN</code> in <code>.env.local</code>.
        </li>
        <li>
          Go to <a href="/debug">/debug</a> and trigger a test error.
        </li>
        <li>Open the issue in Sentry and run Seer on it.</li>
      </ol>
      <p style={{ marginTop: 24 }}>
        <a href="/debug">→ /debug</a>
      </p>
    </main>
  );
}
