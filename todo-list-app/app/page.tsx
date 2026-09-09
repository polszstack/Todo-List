import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50/90 via-orange-50/90 to-rose-50/90 text-stone-900">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated blobs with more colors and better positioning */}
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-amber-200/30 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] bg-orange-200/25 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-[35rem] h-[35rem] bg-rose-200/20 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-yellow-100/10 rounded-full blur-[150px]" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="max-w-2xl">
            {/* Enhanced badge with gradient and glow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-105">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Simple, private, and fast
            </div>

            {/* Enhanced heading with gradient */}
            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              <span className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 bg-clip-text text-transparent">
                A cleaner way to keep your day on track.
              </span>
            </h1>
            
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-700/90">
              Organize tasks, check things off, and stay signed in with a small,
              focused todo app built for everyday use.
            </p>
            
            {/* Enhanced buttons with better hover states */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className="group inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-stone-800 to-stone-900 px-6 text-sm font-medium text-white shadow-lg shadow-stone-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/30 hover:scale-105 active:scale-[0.95]"
              >
                <span className="relative flex items-center gap-2">
                  Create account
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200/80 bg-white/80 px-6 text-sm font-medium text-stone-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 active:scale-[0.95]"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="group inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium text-stone-600 transition-all duration-300 hover:text-stone-900 hover:scale-105"
              >
                <span className="flex items-center gap-1 border-b-2 border-transparent group-hover:border-stone-900 pb-0.5">
                  Open dashboard
                  <svg className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Added trust indicators */}
            <div className="mt-10 flex items-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% private</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Always free</span>
              </div>
            </div>
          </section>

          {/* Enhanced Aside with richer visual elements */}
          <aside className="group rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_16px_60px_rgba(0,0,0,0.1)] hover:scale-[1.02]">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-6 text-white shadow-2xl shadow-stone-950/20 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.2em] text-stone-400 font-medium">
                    Today
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
                
                <ul className="mt-5 space-y-3">
                  <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-[1.02]">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                    </span>
                    <span className="flex-1">Review today&apos;s priorities</span>
                    <span className="text-xs text-stone-400">1h</span>
                  </li>
                  <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-[1.02]">
                    <span className="h-3 w-3 rounded-full bg-amber-300 shadow-lg shadow-amber-300/30" />
                    <span className="flex-1">Finish one important task</span>
                    <span className="text-xs text-stone-400">3h</span>
                  </li>
                  <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-[1.02]">
                    <span className="h-3 w-3 rounded-full bg-sky-300 shadow-lg shadow-sky-300/30" />
                    <span className="flex-1">Clear the rest from your head</span>
                    <span className="text-xs text-stone-400">5h</span>
                  </li>
                  <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-[1.02] opacity-60">
                    <span className="h-3 w-3 rounded-full bg-stone-500" />
                    <span className="flex-1 line-through">Completed task</span>
                    <span className="text-xs text-stone-500">✓</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Enhanced stats grid with gradients */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="group/stat rounded-2xl border border-stone-200/60 bg-gradient-to-br from-white/90 to-stone-50/90 px-3 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300">
                <div className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">01</div>
                <div className="mt-1 text-stone-600">Focus</div>
              </div>
              <div className="group/stat rounded-2xl border border-stone-200/60 bg-gradient-to-br from-white/90 to-stone-50/90 px-3 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300">
                <div className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">12</div>
                <div className="mt-1 text-stone-600">Tasks</div>
              </div>
              <div className="group/stat rounded-2xl border border-stone-200/60 bg-gradient-to-br from-white/90 to-stone-50/90 px-3 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300">
                <div className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">∞</div>
                <div className="mt-1 text-stone-600">Momentum</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer note with subtle animation */}
        <div className="relative mt-16 text-center text-sm text-stone-400 animate-fade-in">
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            Start organizing your day in seconds
            <span className="h-1 w-1 rounded-full bg-stone-300" />
          </span>
        </div>
      </main>
    </div>
  );
}