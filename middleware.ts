import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from './src/lib/auth';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const secret = process.env.PWT_ACC;

  if (!secret) {
    return new NextResponse('Authentication is not configured.', { status: 500 });
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(token, secret);
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

  if (pathname === '/login') {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  const from = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set('from', from);

  if (isApiRoute) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.rewrite(loginUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
