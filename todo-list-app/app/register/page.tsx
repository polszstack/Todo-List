'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getFirebaseErrorMessage = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'This email is already registered. Try logging in or resetting your password.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/weak-password':
          return 'Password is too weak. Use at least 6 characters.';
        case 'auth/network-request-failed':
          return 'Network error. Check your connection and try again.';
        default:
          return error.message;
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'An error occurred';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const email = formData.email.trim();
      const username = formData.username.trim();
      const credential = await createUserWithEmailAndPassword(firebaseAuth, email, formData.password);
      if (username) {
        await updateProfile(credential.user, { displayName: username });
      }

      await sendEmailVerification(credential.user);
      await signOut(firebaseAuth);
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4efe8_0%,_#faf7f2_38%,_#f3f0ea_100%)] text-stone-900">
      <main className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-16">
        <section className="max-w-xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-stone-300/70 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur sm:mb-6">
            Get started
          </div>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Create your account and make the list yours.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-700 sm:mt-6 sm:text-lg sm:leading-8">
            Build a clean workspace for your tasks with a simple account and a focused dashboard designed to keep momentum.
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-sm text-stone-600 sm:mt-8 sm:gap-3">
            <span className="rounded-full border border-stone-300 bg-white/80 px-3 py-2 sm:px-4">Quick setup</span>
            <span className="rounded-full border border-stone-300 bg-white/80 px-3 py-2 sm:px-4">Secure login</span>
            <span className="rounded-full border border-stone-300 bg-white/80 px-3 py-2 sm:px-4">Personal todo space</span>
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Register</h2>
            <p className="mt-2 text-sm text-stone-600">Create your Firebase account to start tracking tasks.</p>
          </div>
          {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Username</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={loading}
              />
            </div>
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
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-stone-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-stone-900 underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
