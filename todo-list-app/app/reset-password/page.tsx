'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] text-stone-900">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16">
        <section className="w-full rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur">
          <h1 className="text-4xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-3 text-stone-600">We’ll send a Firebase reset link to your email address.</p>

          {error && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          {message && <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send reset email'}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-600">
            Back to{' '}
            <Link href="/login" className="font-medium text-stone-900 underline-offset-4 hover:underline">
              login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
