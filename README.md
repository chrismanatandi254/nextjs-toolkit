# Next.js API Routes — Beginner Toolkit

> A beginner-friendly Next.js application demonstrating built-in API Routes using the App Router — built as part of the **Moringa School AI Capstone Project**.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Author](#author)

---

## 📌 About the Project

This project is a hands-on exploration of **Next.js API Routes** using the modern **App Router** introduced in Next.js 13+. It demonstrates:

- How to create server-side REST API endpoints inside a Next.js project (no separate backend needed)
- How to call external public APIs from the server to avoid CORS issues
- How to consume your own API routes from a React frontend with proper loading and error states

It was built using **Generative AI prompts** (via [ai.moringaschool.com](http://ai.moringaschool.com)) as the primary learning tool, making it a real example of AI-assisted development.

---

## 🌐 Live Demo

> 🔗 Coming soon — deploy your own in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chrismanatandi254/nextjs-toolkit)

---

## Features

-  Two working REST API routes out of the box
-  Interactive frontend dashboard to test routes in the browser
-  Server-side external API call (no CORS issues)
-  Graceful error handling on all routes
-  Fully typed with TypeScript
-  Styled with Tailwind CSS
-  Clean, commented code — beginner friendly

---

## 🔌 API Endpoints

### `GET /api/hello`

A custom server-side route. No external dependency. Returns a greeting and the current server timestamp.

**Request:**
```
GET http://localhost:3000/api/hello
```

**Response:**
```json
{
  "message": "Hello from Next.js API Routes! ",
  "timestamp": "2026-04-29T10:32:15.421Z",
  "version": "Next.js 16"
}
```

---

### `GET /api/joke`

Proxies the public [icanhazdadjoke.com](https://icanhazdadjoke.com/api) API from the server and returns a clean JSON response. Demonstrates server-side external API fetching.

**Request:**
```
GET http://localhost:3000/api/joke
```

**Response:**
```json
{
  "joke": "Why don't scientists trust atoms? Because they make up everything.",
  "id": "R7UfaahVfFd",
  "source": "icanhazdadjoke.com",
  "fetchedAt": "2026-04-29T10:33:02.117Z"
}
```

**Error Response (if external API is unreachable):**
```json
{
  "error": "Failed to fetch joke. Please try again."
}
```

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | 18.x or higher | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x or higher | Bundled with Node.js |
| **Git** | Any recent version | [git-scm.com](https://git-scm.com) |
| **VS Code** | Any recent version | [code.visualstudio.com](https://code.visualstudio.com) |

**Verify your versions:**

```bash
node -v    # Should print v18.x.x or higher
npm -v     # Should print 9.x.x or higher
git --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/chrismanatandi254/nextjs-toolkit.git
cd nextjs-toolkit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in your browser

```
http://localhost:3000
```

You should see the API Route Explorer dashboard. Click the buttons to test each API route and see live JSON responses.

---

## Project Structure

```
nextjs-toolkit/
├── src/
│   └── app/
│       ├── api/                        # All API routes live here
│       │   ├── hello/
│       │   │   └── route.ts            # GET /api/hello — custom JSON route
│       │   └── joke/
│       │       └── route.ts            # GET /api/joke — external API proxy
│       ├── page.tsx                    # Frontend dashboard (client component)
│       ├── layout.tsx                  # Root HTML layout
│       └── globals.css                 # Global styles + Tailwind base
├── public/                             # Static assets
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Project dependencies & scripts
└── README.md                           # You are here
```

---

## Available Scripts

Run these from the root of the project:

| Script | Command | Description |
|---|---|---|
| **Dev server** | `npm run dev` | Start local dev server at `localhost:3000` |
| **Production build** | `npm run build` | Compile the app for production |
| **Start production** | `npm run start` | Run the production build locally |
| **Lint** | `npm run lint` | Check code for ESLint errors |

---

## How It Works

### App Router API Routes

In Next.js App Router, any folder inside `app/` named `api/` that contains a `route.ts` file automatically becomes a REST API endpoint — no configuration needed.

```
app/api/hello/route.ts  →  accessible at  /api/hello
app/api/joke/route.ts   →  accessible at  /api/joke
```

HTTP methods map directly to exported function names:

```typescript
export async function GET()    { ... }  // handles GET requests
export async function POST()   { ... }  // handles POST requests
export async function DELETE() { ... }  // handles DELETE requests
```

### Why fetch externally from a route handler?

When a browser fetches from a third-party API directly, the browser enforces **CORS** (Cross-Origin Resource Sharing) restrictions. Many APIs block cross-origin requests.

By fetching inside a `route.ts`, the request runs on the **server** — not the browser. Server-to-server calls bypass CORS entirely, and any API keys you use stay private (never exposed to the client).

```
Browser → /api/joke (your server) → icanhazdadjoke.com
                                         ↑
                               No CORS restriction here
```

---

## Troubleshooting

### `npm install` fails on Windows (EBUSY / EPERM)

Windows sometimes locks `node_modules` files. Fix:

```powershell
# Close VS Code and all terminals first, then:
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
```

### `npm install` fails with ECONNRESET (network error)

```powershell
# Try forcing the official registry
npm install --registry https://registry.npmjs.org

# Or clear cache and retry
npm cache clean --force
npm install
```

If on a school or work network, try switching to a mobile hotspot.

### Build fails — `Failed to fetch Geist from Google Fonts`

This happens in network-restricted environments. Remove Google Font imports from `src/app/layout.tsx` and use the system font stack instead:

```typescript
// Remove these lines from layout.tsx:
import { Geist, Geist_Mono } from "next/font/google";
```

### Port 3000 already in use

```bash
# Run on a different port
npm run dev -- -p 3001
# Then open http://localhost:3001
```

### API route returns 404

Make sure your file is named exactly `route.ts` (not `index.ts` or `hello.ts`) and lives inside a folder:

```
 src/app/api/hello/route.ts
 src/app/api/hello.ts
```

---

## Contributing

This is a learning project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/add-new-route`
3. Commit your changes: `git commit -m "Add new API route"`
4. Push to the branch: `git push origin feature/add-new-route`
5. Open a Pull Request

---

## Author

**[Your Name]**
- GitHub: [@chrismanatandi254](https://github.com/chrismanatandi254)
- Moringa School AI Capstone — April 2026

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with TypeScript using Next.js and Generative AI — Moringa School Capstone 2026*