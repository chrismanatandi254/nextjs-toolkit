"use client";

import { useState } from "react";

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
  error?: string;
};

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function Home() {
  const [hello, setHello] = useState<ApiState<HelloResponse>>({
    data: null, loading: false, error: null,
  });

  const [joke, setJoke] = useState<ApiState<JokeResponse>>({
    data: null, loading: false, error: null,
  });

  async function fetchHello() {
    setHello({ data: null, loading: true, error: null });
    try {
      const res = await fetch("/api/hello");
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setHello({ data, loading: false, error: null });
    } catch {
      setHello({ data: null, loading: false, error: "Failed to reach /api/hello" });
    }
  }

  async function fetchJoke() {
    setJoke({ data: null, loading: true, error: null });
    try {
      const res = await fetch("/api/joke");
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setJoke({ data, loading: false, error: null });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to reach /api/joke";
      setJoke({ data: null, loading: false, error: msg });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      <header className="border-b border-zinc-800 px-8 py-5 flex items-center gap-3">
        <span className="text-emerald-400 text-xl">▲</span>
        <h1 className="text-sm font-bold tracking-widest uppercase text-zinc-300">
          Next.js API Routes — Beginner Toolkit
        </h1>
        <span className="ml-auto text-xs text-zinc-600 tracking-wider">v16</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">API Route Explorer</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Two live Next.js API routes — one custom, one that calls an external service.
            Hit the buttons to test them in real time.
          </p>
        </div>

        {/* /api/hello */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">GET</span>
              <span className="ml-3 text-sm text-zinc-200 font-semibold">/api/hello</span>
            </div>
            <span className="text-xs text-zinc-500">Custom route · returns JSON</span>
          </div>
          <div className="px-6 py-5 space-y-4">
            <p className="text-xs text-zinc-400">
              A simple server-side route that returns a greeting and the current server timestamp.
            </p>
            <button
              onClick={fetchHello}
              disabled={hello.loading}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black text-xs font-bold tracking-wider transition-colors"
            >
              {hello.loading ? "Fetching..." : "Send Request →"}
            </button>
            {hello.error && (
              <div className="rounded-lg bg-red-950 border border-red-800 px-4 py-3 text-xs text-red-400">✖ {hello.error}</div>
            )}
            {hello.data && (
              <div className="rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3">
                <p className="text-xs text-zinc-500 mb-2 uppercase tracking-widest">Response</p>
                <pre className="text-xs text-emerald-300 whitespace-pre-wrap">{JSON.stringify(hello.data, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* /api/joke */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">GET</span>
              <span className="ml-3 text-sm text-zinc-200 font-semibold">/api/joke</span>
            </div>
            <span className="text-xs text-zinc-500">External API · icanhazdadjoke.com</span>
          </div>
          <div className="px-6 py-5 space-y-4">
            <p className="text-xs text-zinc-400">
              Calls <span className="text-zinc-300">icanhazdadjoke.com</span> server-side and forwards clean JSON — no CORS issues, no exposed keys.
            </p>
            <button
              onClick={fetchJoke}
              disabled={joke.loading}
              className="px-5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-black text-xs font-bold tracking-wider transition-colors"
            >
              {joke.loading ? "Fetching..." : "Get a Joke →"}
            </button>
            {joke.error && (
              <div className="rounded-lg bg-red-950 border border-red-800 px-4 py-3 text-xs text-red-400">✖ {joke.error}</div>
            )}
            {joke.data && (
              <div className="rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-4 space-y-3">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Response</p>
                <p className="text-base text-yellow-300 leading-relaxed">"{joke.data.joke}"</p>
                <pre className="text-xs text-zinc-500 whitespace-pre-wrap pt-2 border-t border-zinc-800">
{JSON.stringify({ id: joke.data.id, source: joke.data.source, fetchedAt: joke.data.fetchedAt }, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-5 space-y-3">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">How It Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-400">
            <div className="space-y-1">
              <p className="text-zinc-200 font-semibold">App Router API Routes</p>
              <p>Each folder inside <code className="text-emerald-400">app/api/</code> with a <code className="text-emerald-400">route.ts</code> becomes a REST endpoint automatically.</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-200 font-semibold">Server-side Fetching</p>
              <p>The <code className="text-yellow-400">/api/joke</code> route fetches from an external API on the server — avoiding CORS and keeping keys private.</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-600 text-center pt-4">
          Moringa AI Capstone · Next.js Beginner Toolkit · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
