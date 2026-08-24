# seer-playground

A minimal Next.js (App Router, TypeScript) app pre-wired to
[Sentry](https://sentry.io), built as a target for **Seer** — Sentry's AI
agent for issue root-cause analysis and autofix.

## 1. Run locally

```bash
npm install
cp .env.local.example .env.local   # add your NEXT_PUBLIC_SENTRY_DSN
npm run dev
```

Visit http://localhost:3000/debug and click a button to send a test error.

## 2. Connect Sentry

Either paste a DSN from an existing Sentry project into `.env.local`, or run
the official wizard (creates config + uploads source maps):

```bash
npx @sentry/wizard@latest -i nextjs
```

The SDK is already wired manually, so the wizard is optional — you mainly need
a DSN in `NEXT_PUBLIC_SENTRY_DSN`.

## 3. Turn on Seer

Seer runs inside Sentry once this repo is connected:

1. In Sentry: **Settings → Integrations → GitHub** → install the app and grant
   access to this repo.
2. **Settings → Projects → seer-playground → Code Mappings** → map the Sentry
   project to this GitHub repo so Seer can read the source.
3. (Optional) Install the **Seer by Sentry** GitHub app for automated PR
   reviews.
4. Trigger an error via `/debug`, open the issue in Sentry, and run
   **Autofix / Seer** on it.

## What's wired

| File | Purpose |
| --- | --- |
| `instrumentation-client.ts` | Browser SDK init + Replay |
| `sentry.server.config.ts` / `sentry.edge.config.ts` | Server & edge SDK init |
| `instrumentation.ts` | Loads the right config per runtime + `onRequestError` |
| `next.config.ts` | `withSentryConfig` wrapper |
| `app/debug/page.tsx` | Buttons to throw client/server errors |
| `app/api/debug/route.ts` | Server route that throws |
| `app/global-error.tsx` | Captures React render errors |
