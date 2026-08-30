import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] text-stone-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-stone-300/70 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
              Simple, private, and fast
            </div>
            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              A cleaner way to keep your day on track.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-700">
              Organize tasks, check things off, and stay signed in with a small,
              focused todo app built for everyday use.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white/80 px-6 text-sm font-medium text-stone-900 transition hover:bg-white"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium text-stone-700 underline-offset-4 transition hover:text-stone-900 hover:underline"
              >
                Open dashboard
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="rounded-2xl bg-stone-950 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
                Today
              </p>
              <ul className="mt-5 space-y-4">
                <li className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  Review today&apos;s priorities
                </li>
                <li className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  Finish one important task
                </li>
                <li className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-sky-300" />
                  Clear the rest from your head
                </li>
              </ul>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl bg-stone-100 px-3 py-4">
                <div className="text-2xl font-semibold">01</div>
                <div className="mt-1 text-stone-600">Focus</div>
              </div>
              <div className="rounded-2xl bg-stone-100 px-3 py-4">
                <div className="text-2xl font-semibold">12</div>
                <div className="mt-1 text-stone-600">Tasks</div>
              </div>
              <div className="rounded-2xl bg-stone-100 px-3 py-4">
                <div className="text-2xl font-semibold">∞</div>
                <div className="mt-1 text-stone-600">Momentum</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
