# Getting Started with Next.js API Routes – A Beginner's Toolkit

** AI Capstone Project**
**Author:** [Chrisman Atandi]
**Date:** April 2026

---

## Table of Contents

1. [Title & Objective](#1-title--objective)
2. [Quick Summary of the Technology](#2-quick-summary-of-the-technology)
3. [System Requirements](#3-system-requirements)
4. [Installation & Setup Instructions](#4-installation--setup-instructions)
5. [Minimal Working Example](#5-minimal-working-example)
6. [AI Prompt Journal](#6-ai-prompt-journal)
7. [Common Issues & Fixes](#7-common-issues--fixes)
8. [References](#8-references)

---

## 1. Title & Objective

### What technology did you choose?

**Next.js** — specifically its built-in **API Routes** feature using the App Router (`/app/api`).

### Why did you choose it?

Next.js sits at the top of the modern fullstack JavaScript ecosystem. As an intermediate developer coming from JavaScript, I wanted to explore a technology that lets me build both a frontend and a backend API without switching frameworks or languages. Next.js API Routes are a game-changer: instead of spinning up a separate Express or Fastify server, you write a `route.ts` file inside a folder and Next.js turns it into a live REST endpoint automatically.

I also chose it because Next.js powers production apps at companies like Vercel, Notion, and TikTok — so the skills transfer directly to real-world work.

### What is the end goal?

Build and run a small Next.js application that exposes two API routes:
- **`/api/hello`** — a custom server-side route returning a JSON greeting and timestamp
- **`/api/joke`** — a server-side route that calls the public `icanhazdadjoke.com` API and returns a processed JSON response

The frontend dashboard lets users test both routes interactively in the browser, demonstrating how API routes work end-to-end.

---

## 2. Quick Summary of the Technology

### What is Next.js?

Next.js is an open-source **React framework** created by Vercel that enables fullstack web development. It extends plain React with features like:

- **Server-Side Rendering (SSR)** — HTML is generated on the server per request
- **Static Site Generation (SSG)** — pages are pre-built at compile time
- **App Router** — a file-system based routing system introduced in Next.js 13
- **API Routes** — backend REST endpoints defined directly inside the project folder

In essence, Next.js lets you build a complete web application — frontend and backend — in a single codebase, using TypeScript/JavaScript throughout.

### Where is it used?

Next.js is widely adopted across the industry:

- **SaaS products** — dashboards, admin panels, and multi-tenant apps
- **E-commerce** — storefronts that need SEO and fast page loads
- **Marketing & content sites** — blogs, landing pages, documentation portals
- **Internal tools** — company portals and API-backed dashboards

### One real-world example

**Notion** (the productivity tool) uses Next.js for its web interface. The combination of server-side rendering for fast initial loads and client-side React for interactive editing is a classic Next.js pattern.

---

## 3. System Requirements

| Requirement | Details |
|---|---|
| **Operating System** | Windows 10/11, macOS 12+, or Ubuntu 20.04+ |
| **Node.js** | Version **18.x or higher** (LTS recommended) |
| **npm** | Version 9+ (bundled with Node.js) |
| **Code Editor** | VS Code (recommended) with the ESLint extension |
| **Terminal** | PowerShell (Windows), Terminal (macOS/Linux) |
| **Browser** | Any modern browser (Chrome, Firefox, Edge) |

### Verify your Node version

```bash
node -v
# Expected: v24.13.1 or higher

npm -v
# Expected: 11.10.0 or higher
```

If Node is not installed, download it from [nodejs.org](https://nodejs.org).

---

## 4. Installation & Setup Instructions

### Step 1 — Create a new Next.js project

Open your terminal and run:

```bash
npx create-next-app@latest nextjs-toolkit
```

You will be prompted with configuration options. Choose the following:

```
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like your code inside a `src/` directory? → Yes
✔ Would you like to use App Router? → Yes
✔ Would you like to use Turbopack for next dev? → No
✔ Would you like to customize the import alias? → No
```

### Step 2 — Navigate into the project

```bash
cd nextjs-toolkit
```

### Step 3 — Verify the project structure

Your folder should look like this:

```
nextjs-toolkit/
├── src/
│   └── app/
│       ├── api/              ← API routes live here
│       │   ├── hello/
│       │   │   └── route.ts
│       │   └── joke/
│       │       └── route.ts
│       ├── page.tsx          ← Frontend homepage
│       ├── layout.tsx
│       └── globals.css
├── public/
├── package.json
├── next.config.ts
└── tsconfig.json
```

### Step 4 — Start the development server

```bash
npm run dev
```

Expected terminal output:

```
▲ Next.js 16.2.4
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Starting...
✓ Ready in 1234ms
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Next.js welcome page.

### Step 5 — Build for production (optional verification)

```bash
npm run build
```

Expected output confirms your routes:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/hello
└ ƒ /api/joke

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## 5. Minimal Working Example

### What this example does

The project contains two API routes and one frontend page:

- **`/api/hello`** — a purely custom route. No external calls. It reads nothing from the request and returns a JSON object with a greeting and the current server timestamp. This is the "Hello World" of Next.js API routes.
- **`/api/joke`** — a proxy route. It calls the public `icanhazdadjoke.com` REST API from the server, extracts the joke, and returns clean JSON. This demonstrates server-side external API calls, which avoid CORS issues and keep API keys private.
- **Frontend (`page.tsx`)** — a client-side React page with two buttons. Each button fetches from one of the API routes and renders the JSON response in the browser.

---

### API Route 1 — `/api/hello`

**File:** `src/app/api/hello/route.ts`

```typescript
import { NextResponse } from "next/server";

// GET /api/hello
// Returns a simple greeting message with server timestamp
export async function GET() {
  return NextResponse.json({
    message: "Hello from Next.js API Routes! 🚀",
    timestamp: new Date().toISOString(), // current server time
    version: "Next.js 16",
  });
}
```

**Expected response when visiting `/api/hello`:**

```json
{
  "message": "Hello from Next.js API Routes! 🚀",
  "timestamp": "2026-04-29T10:32:15.421Z",
  "version": "Next.js 16"
}
```

**Key concepts:**
- `export async function GET()` — Next.js maps HTTP verbs to exported function names. `GET` handles GET requests. You can also export `POST`, `PUT`, `DELETE`, etc.
- `NextResponse.json()` — a helper that sets the correct `Content-Type: application/json` header automatically.

---

### API Route 2 — `/api/joke`

**File:** `src/app/api/joke/route.ts`

```typescript
import { NextResponse } from "next/server";

// GET /api/joke
// Fetches a random dad joke from icanhazdadjoke.com
// Demonstrates calling an external API from a Next.js route handler
export async function GET() {
  try {
    // Fetch from external API — runs on the SERVER, not the browser
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        // Required by icanhazdadjoke.com — identifies your app
        "User-Agent": "NextJS Beginner Toolkit (learning project)",
      },
    });

    // Always check if the external request succeeded
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Return a clean, shaped response — don't just pass raw data
    return NextResponse.json({
      joke: data.joke,
      id: data.id,
      source: "icanhazdadjoke.com",
      fetchedAt: new Date().toISOString(),
    });

  } catch (error) {
    // Gracefully handle failures — always return a valid HTTP response
    return NextResponse.json(
      { error: "Failed to fetch joke. Please try again." },
      { status: 500 } // Set appropriate HTTP status code
    );
  }
}
```

**Expected response when visiting `/api/joke`:**

```json
{
  "joke": "Why don't scientists trust atoms? Because they make up everything.",
  "id": "R7UfaahVfFd",
  "source": "icanhazdadjoke.com",
  "fetchedAt": "2026-04-29T10:33:02.117Z"
}
```

**Key concepts:**
- The `fetch()` inside a route handler runs **server-side** — the browser never touches `icanhazdadjoke.com` directly. This eliminates CORS issues.
- The `try/catch` block ensures any network failure returns a proper `500` JSON error instead of crashing.
- Shaping the response (picking only `joke`, `id`) is good API design practice.

---

### Frontend Dashboard

**File:** `src/app/page.tsx`

```tsx
"use client"; // This component runs in the browser

import { useState } from "react";

// TypeScript types for our API responses
type HelloResponse = {
  message: string;
  timestamp: string;
  version: string;
};

type JokeResponse = {
  joke: string;
  id: string;
  source: string;
  fetchedAt: string;
};

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function Home() {
  // State for each API route's response
  const [hello, setHello] = useState<ApiState<HelloResponse>>({
    data: null, loading: false, error: null,
  });

  const [joke, setJoke] = useState<ApiState<JokeResponse>>({
    data: null, loading: false, error: null,
  });

  // Fetch from /api/hello
  async function fetchHello() {
    setHello({ data: null, loading: true, error: null });
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setHello({ data, loading: false, error: null });
    } catch {
      setHello({ data: null, loading: false, error: "Request failed" });
    }
  }

  // Fetch from /api/joke
  async function fetchJoke() {
    setJoke({ data: null, loading: true, error: null });
    try {
      const res = await fetch("/api/joke");
      const data = await res.json();
      setJoke({ data, loading: false, error: null });
    } catch {
      setJoke({ data: null, loading: false, error: "Request failed" });
    }
  }

  return (
    <main>
      <h1>Next.js API Route Explorer</h1>

      {/* Test /api/hello */}
      <section>
        <h2>GET /api/hello</h2>
        <button onClick={fetchHello} disabled={hello.loading}>
          {hello.loading ? "Loading..." : "Send Request"}
        </button>
        {hello.data && <pre>{JSON.stringify(hello.data, null, 2)}</pre>}
        {hello.error && <p>Error: {hello.error}</p>}
      </section>

      {/* Test /api/joke */}
      <section>
        <h2>GET /api/joke</h2>
        <button onClick={fetchJoke} disabled={joke.loading}>
          {joke.loading ? "Loading..." : "Get a Joke"}
        </button>
        {joke.data && <pre>{JSON.stringify(joke.data, null, 2)}</pre>}
        {joke.error && <p>Error: {joke.error}</p>}
      </section>
    </main>
  );
}
```

**Expected output in browser:**

When you click "Send Request" under `/api/hello`, you see:

```json
{
  "message": "Hello from Next.js API Routes! 🚀",
  "timestamp": "2026-04-29T10:32:15.421Z",
  "version": "Next.js 16"
}
```

When you click "Get a Joke" under `/api/joke`, you see:

```json
{
  "joke": "I used to hate facial hair, but then it grew on me.",
  "id": "MRZ0LJtHQCd",
  "source": "icanhazdadjoke.com",
  "fetchedAt": "2026-04-29T10:33:45.002Z"
}
```

---

## 6. AI Prompt Journal

All prompts were submitted via [claude.ai](http://claude.ai).

---

### Prompt 1 — Understanding Next.js App Router API Routes

**Prompt used:**
> "I'm an intermediate JavaScript developer new to Next.js. Explain how API routes work in the Next.js App Router. How is a `route.ts` file different from a `page.tsx` file? Give me a simple GET example."

**AI's response summary:**
The AI explained that in the App Router, any folder inside `app/` with a `route.ts` (or `route.js`) file becomes an API endpoint — not a rendered page. It clarified that `page.tsx` renders HTML for the browser, while `route.ts` handles raw HTTP requests and returns JSON or other data. It also showed how Next.js maps HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) to exported function names, which was a key insight I hadn't encountered in Express.

**Evaluation:**
Very helpful. The distinction between `page.tsx` and `route.ts` is subtle for beginners and the AI made it immediately clear. The example it gave closely matched what I built in this project.

---

### Prompt 2 — Server-side External API Fetching

**Prompt used:**
> "In my Next.js route handler, I want to call an external public API (icanhazdadjoke.com) and return its data as JSON. Show me how to do this correctly, including error handling. Why should I do this in a route handler instead of directly from the browser?"

**AI's response summary:**
The AI provided a full `route.ts` example using `fetch()` inside the handler, with a `try/catch` block and appropriate HTTP status codes. It also explained the key reason to fetch server-side: CORS. When the browser calls an external API directly, the external server may block it unless it whitelists your domain. When a Next.js route handler does the fetch, it runs on the server — no browser, no CORS restriction.

**Evaluation:**
Extremely helpful. I had not thought about CORS being a motivation for server-side fetching. This deepened my understanding beyond just "making it work" to understanding *why* this pattern exists.

---

### Prompt 3 — TypeScript Types for API Responses

**Prompt used:**
> "I'm building a Next.js frontend page that fetches from two of my own API routes. How should I type the responses in TypeScript? Show me a pattern using `useState` for managing loading, error, and data states."

**AI's response summary:**
The AI introduced a generic `ApiState<T>` type that wraps `data`, `loading`, and `error` — a pattern common in React data-fetching hooks. It showed how to use it with `useState` for multiple independent API calls on the same page without repeating code.

**Evaluation:**
Very helpful for an intermediate developer stepping into TypeScript with React. The generic type pattern is clean and reusable, and I used it almost verbatim in `page.tsx`.

---

### Prompt 4 — Debugging a Build Error (Google Fonts in Sandbox)

**Prompt used:**
> "My Next.js build is failing with: `Failed to fetch Geist Mono from Google Fonts`. The error comes from `layout.tsx`. I'm running this in a restricted network environment. How do I fix it?"

**AI's response summary:**
The AI identified that `create-next-app` defaults to importing `Geist` and `Geist Mono` via `next/font/google`, which fetches fonts from Google's servers at build time. In environments without internet access (or with restricted domains), this fails. The fix: remove the Google Font imports from `layout.tsx` and fall back to the system font stack via Tailwind (`font-mono`, `font-sans`).

**Evaluation:**
Critical fix. Without this prompt, my build would have failed entirely. The AI immediately identified the root cause and gave a one-step solution. It also explained *why* the error occurs so I could prevent it in future projects.

---

### Prompt 5 — Windows `npm install` EBUSY/EPERM Errors

**Prompt used:**
> "I'm on Windows and getting EBUSY and EPERM errors when running `npm install` inside my Next.js project. The errors mention locked node_modules paths. What's causing this and how do I fix it?"

**AI's response summary:**
The AI explained that Windows file locking is more aggressive than on macOS/Linux — VS Code, another terminal, or a background antivirus scan can hold open file handles on `node_modules`, preventing npm from cleaning up. The fix was to close all editors and terminals, delete `node_modules` and `package-lock.json` manually using `Remove-Item`, clear the npm cache, and reinstall.

**Evaluation:**
Helpful and accurate. The fix worked immediately once I closed VS Code and ran the cleanup commands. This is a Windows-specific issue that many beginners get stuck on.

---

## 7. Common Issues & Fixes

### Issue 1 — App Router vs Pages Router Confusion

**What happened:**
When searching tutorials online, many examples use the Pages Router (`/pages/api/hello.ts`) rather than the App Router (`/app/api/hello/route.ts`). I initially created a file in the wrong structure, and Next.js didn't recognise it as an API route.

**Fix:**
In the App Router, every API route must:
1. Live inside `src/app/api/`
2. Be named exactly `route.ts` (not `hello.ts` or `index.ts`)

```
✅ src/app/api/hello/route.ts     ← App Router (correct)
❌ src/pages/api/hello.ts         ← Pages Router (different version)
```

**Reference:** [Next.js Route Handlers Docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

### Issue 2 — Google Fonts Build Failure in Restricted Environments

**What happened:**
Running `npm run build` failed with:

```
Failed to fetch `Geist Mono` from Google Fonts
```

**Fix:**
Remove the Google Font imports from `src/app/layout.tsx`. Replace:

```typescript
// ❌ Remove this
import { Geist, Geist_Mono } from "next/font/google";
```

With a clean layout using no external fonts:

```typescript
// ✅ Use this instead
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

### Issue 3 — Windows `npm install` Fails (EBUSY / EPERM / ECONNRESET)

**What happened:**
Running `npm install` on Windows produced:

```
npm warn cleanup [Error: EBUSY: resource busy or locked]
npm error code ECONNRESET
```

**Fix — Full reset sequence:**

```powershell
# 1. Close VS Code and all other terminals first

# 2. Delete locked folders
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall
npm install
```

If ECONNRESET persists (network issue), try:

```powershell
npm install --registry https://registry.npmjs.org
```

Or switch to a mobile hotspot if on a restricted school/work network.

**Reference:** [npm ECONNRESET troubleshooting](https://stackoverflow.com/questions/18419144/npm-not-working-returning-error-econnreset)

---

### Issue 4 — CORS Error When Fetching External API Directly from Browser

**What happened:**
When I initially tried to call `icanhazdadjoke.com` directly from the browser (inside `page.tsx`), I received:

```
Access to fetch at 'https://icanhazdadjoke.com/' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Fix:**
Move the external API call into a Next.js route handler (`route.ts`). The browser calls your own `/api/joke` endpoint, which calls the external API on the server. Server-to-server calls are not subject to browser CORS restrictions.

```
Browser → /api/joke (your server) → icanhazdadjoke.com
                                  ↑ No CORS here
```

---

### Issue 5 — Missing `User-Agent` Header (icanhazdadjoke.com)

**What happened:**
Calling `icanhazdadjoke.com` without a `User-Agent` header returned an HTML error page instead of JSON.

**Fix:**
Add the `User-Agent` and `Accept` headers to your fetch call:

```typescript
const response = await fetch("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json",
    "User-Agent": "MyNextJsApp (learning project)",
  },
});
```

**Reference:** [icanhazdadjoke API docs](https://icanhazdadjoke.com/api)

---

## 8. References

### Official Documentation

- [Next.js Official Docs](https://nextjs.org/docs) — comprehensive guide covering App Router, API routes, SSR, and deployment
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) — specific docs for `route.ts` files
- [NextResponse API Reference](https://nextjs.org/docs/app/api-reference/functions/next-response) — all methods available on the response object
- [icanhazdadjoke API](https://icanhazdadjoke.com/api) — the external public API used in this project

### Video Tutorials

- [Next.js 14 Full Course – Fireship (YouTube)](https://www.youtube.com/watch?v=ZVnjOPwW4ZA) — fast-paced overview of App Router concepts
- [Next.js App Router Crash Course – Traversy Media](https://www.youtube.com/watch?v=Y6KDk5iyrYE) — beginner-friendly walkthrough
- [API Routes in Next.js App Router – Jack Herrington](https://www.youtube.com/watch?v=gEB3ckYeZF4) — deep dive into route handlers

### Helpful Articles & Guides

- [Next.js App Router vs Pages Router – Vercel Blog](https://vercel.com/blog/nextjs-app-router-data-fetching) — explains the difference between the two routing systems
- [Understanding CORS – MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) — background on why CORS exists and how to handle it
- [TypeScript Generics for Beginners](https://www.typescriptlang.org/docs/handbook/2/generics.html) — explains the `ApiState<T>` pattern used in this project
- [npm ECONNRESET Fix – Stack Overflow](https://stackoverflow.com/questions/18419144/npm-not-working-returning-error-econnreset) — community solutions for network install errors

### Tools Used

| Tool | Purpose | Link |
|---|---|---|
| claude.ai | AI prompting for learning | [claude.ai](http://claude.ai) |
| VS Code | Code editor | [code.visualstudio.com](https://code.visualstudio.com) |
| Vercel | Deployment platform | [vercel.com](https://vercel.com) |
| icanhazdadjoke | Public API for testing | [icanhazdadjoke.com](https://icanhazdadjoke.com) |

---

*AI Capstone — April 2026*
*"Prompt-Powered Kickstart: Building a Beginner's Toolkit for Next.js API Routes"*