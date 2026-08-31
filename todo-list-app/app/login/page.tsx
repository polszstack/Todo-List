'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
      const idToken = await getIdToken(credential.user, true);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Unable to create session');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] text-stone-900">
      <main className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
        <section className="max-w-xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-stone-300/70 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
            Welcome back
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Sign in and pick up right where you left off.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-700">
            Your todo list, ready when you are. Keep tasks moving from anywhere with a calm, focused interface.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-stone-600">
            <span className="rounded-full border border-stone-300 bg-white/80 px-4 py-2">Private session</span>
            <span className="rounded-full border border-stone-300 bg-white/80 px-4 py-2">Fast access</span>
            <span className="rounded-full border border-stone-300 bg-white/80 px-4 py-2">Todo dashboard</span>
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold tracking-tight">Login</h2>
            <p className="mt-2 text-sm text-stone-600">Use your Firebase email and password to continue.</p>
          </div>
          {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
              <input
                type="password"
                required
                className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className="mt-5 flex items-center justify-between text-sm">
            <Link href="/reset-password" className="font-medium text-stone-700 underline-offset-4 hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="font-medium text-stone-900 underline-offset-4 hover:underline">
              Register
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
