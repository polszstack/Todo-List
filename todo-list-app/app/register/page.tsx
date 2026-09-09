 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';

// Icons
const Icons = {
  User: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Mail: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Check: (props: { className?: string }) => (
    <svg className={`h-5 w-5 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ArrowRight: (props: { className?: string }) => (
    <svg className={`h-4 w-4 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Shield: (props: { className?: string }) => (
    <svg className={`h-4 w-4 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Sparkle: (props: { className?: string }) => (
    <svg className={`h-4 w-4 ${props.className ?? ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
    </svg>
  ),
};

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
      const logoutResponse = await fetch('/api/logout', { method: 'POST' });
      if (!logoutResponse.ok) {
        throw new Error('Unable to start registration. Please try again.');
      }

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50/90 via-orange-50/90 to-rose-50/90 text-stone-900">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-amber-200/30 rounded-full blur-[120px] animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-orange-200/25 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-rose-100/20 rounded-full blur-[150px]" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-200/20 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <main className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-16">
        {/* Left Section - Enhanced */}
        <section className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-105 sm:mb-6">
            <Icons.Sparkle className="h-3.5 w-3.5 text-amber-500" />
            Get started
          </div>
          
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-stone-900 via-stone-700 to-stone-800 bg-clip-text text-transparent">
              Create your account and make the list yours.
            </span>
          </h1>
          
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-700/90 sm:mt-6 sm:text-lg sm:leading-8">
            Build a clean workspace for your tasks with a simple account and a focused dashboard designed to keep momentum.
          </p>
          
          <div className="mt-7 flex flex-wrap gap-2 text-sm text-stone-600 sm:mt-8 sm:gap-3">
            <span className="group rounded-full border border-stone-200/80 bg-white/80 px-3 py-2 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:scale-105 sm:px-4 flex items-center gap-1.5">
              <Icons.Sparkle className="h-3.5 w-3.5 text-amber-500" />
              Quick setup
            </span>
            <span className="group rounded-full border border-stone-200/80 bg-white/80 px-3 py-2 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:scale-105 sm:px-4 flex items-center gap-1.5">
              <Icons.Shield className="h-3.5 w-3.5" />
              Secure login
            </span>
            <span className="group rounded-full border border-stone-200/80 bg-white/80 px-3 py-2 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:scale-105 sm:px-4 flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Personal todo space
            </span>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex items-center gap-6 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Email verification</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Secure storage</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Free forever</span>
            </div>
          </div>
        </section>

        {/* Right Section - Enhanced Register Card */}
        <section className="relative rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all hover:shadow-[0_32px_100px_rgba(0,0,0,0.12)] sm:p-6 sm:p-8">
          {/* Card gradient overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-50/20 via-transparent to-rose-50/20 pointer-events-none" />
          
          <div className="relative">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 p-2.5 text-white shadow-lg shadow-stone-900/20">
                  <Icons.User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Register</h2>
                  <p className="mt-0.5 text-sm text-stone-600">Create your Firebase account to start tracking tasks.</p>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur px-4 py-3 text-sm text-red-700 shadow-lg shadow-red-100/50 flex items-start gap-3">
                <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 flex items-center gap-2">
                  <Icons.User className="h-4 w-4 text-stone-500" />
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-2xl border-2 border-stone-200 bg-white/90 backdrop-blur px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200 focus:bg-white hover:border-stone-300"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={loading}
                  placeholder="johndoe"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 flex items-center gap-2">
                  <Icons.Mail className="h-4 w-4 text-stone-500" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-2xl border-2 border-stone-200 bg-white/90 backdrop-blur px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200 focus:bg-white hover:border-stone-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 flex items-center gap-2">
                  <Icons.Lock className="h-4 w-4 text-stone-500" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full rounded-2xl border-2 border-stone-200 bg-white/90 backdrop-blur px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200 focus:bg-white hover:border-stone-300"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={loading}
                  placeholder="••••••••"
                />
                <p className="mt-1.5 text-xs text-stone-500">Minimum 6 characters</p>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 flex items-center gap-2">
                  <Icons.Check className="h-4 w-4 text-stone-500" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full rounded-2xl border-2 border-stone-200 bg-white/90 backdrop-blur px-4 py-3 outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200 focus:bg-white hover:border-stone-300"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  disabled={loading}
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="submit"
                className="group relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-stone-800 to-stone-900 px-6 text-sm font-medium text-white shadow-lg shadow-stone-900/20 transition-all hover:shadow-xl hover:shadow-stone-900/30 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <Icons.ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-stone-200/60 text-center">
              <p className="text-sm text-stone-600">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="group inline-flex items-center gap-1.5 font-medium text-stone-900 transition-all hover:text-stone-700"
                >
                  <span>Login</span>
                  <Icons.ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}