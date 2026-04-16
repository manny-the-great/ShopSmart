import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Pages that don't require authentication
const PUBLIC_PATHS = ['/', '/pin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and static assets
  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check auth from Zustand persisted storage key 'shopsmart-auth'
  const authCookie = request.cookies.get('shopsmart-auth');

  // Try to read from localStorage via the cookie (Zustand persist sets a cookie in some configs)
  // Since Zustand persist uses localStorage (not cookies), we rely on a custom cookie
  // set during login. Check for our auth session cookie.
  const sessionCookie = request.cookies.get('ss-session');

  if (!sessionCookie) {
    // Redirect to PIN page
    const loginUrl = new URL('/pin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - manifest files
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|icons).*)',
  ],
};
