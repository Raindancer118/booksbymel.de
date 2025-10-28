import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from './src/lib/auth';

const PUBLIC_FILE = /\.(.*)$/;

const authSecret = process.env.PWT_ACC ?? '';
const authConfigured = authSecret.length > 0;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (!authConfigured) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(token, authSecret);
  const isApiRoute = pathname.startsWith('/api');

  if (isAuthenticated) {
    if (pathname === '/login') {
      const target = request.nextUrl.searchParams.get('from');
      if (target && target.startsWith('/')) {
        return NextResponse.redirect(new URL(target, request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (isApiRoute) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
