// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(
      Buffer.from(normalized, 'base64').toString('utf8')
    ) as { exp?: number };

    return typeof decoded.exp !== 'number' || decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ['/login', '/register', '/reset-password'];
  if (publicRoutes.includes(pathname)) {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isTokenExpired(token)) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/reset-password'],
};
