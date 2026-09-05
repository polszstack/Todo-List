'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { sendEmailVerification } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';

function VerifyEmailContent() {
  const params = useSearchParams();
  const email = params?.get('email') || '';
  const [message, setMessage] = useState(
    email ? `We sent a verification link to ${email}. Check your inbox before logging in.` : 'Check your inbox for a verification link.'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resend = async () => {
    setLoading(true);
    setError('');
    try {
      if (!firebaseAuth.currentUser) {
        throw new Error('Please register again or log in before resending the verification email.');
      }
      await sendEmailVerification(firebaseAuth.currentUser);
      setMessage('Verification email sent again. Please check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] text-stone-900">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6 sm:py-12">
        <section className="w-full rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Verify your email</h1>
          <p className="mt-3 text-sm text-stone-600 sm:text-base">{message}</p>

          {error && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={resend}
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-50 sm:w-auto"
            >
              {loading ? 'Sending...' : 'Resend verification email'}
            </button>
            <Link
              href="/login"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-900 transition hover:bg-stone-50 sm:w-auto"
            >
              Go to login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
