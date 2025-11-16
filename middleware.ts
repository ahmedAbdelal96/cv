import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routing } from './src/i18n/routing';

const LOCALE_COOKIE_NAME = 'locale';

function getLocaleFromAcceptLanguage(
  header: string | null,
  locales: readonly string[]
) {
  if (!header) return null;
  const parts = header.split(',');
  for (const part of parts) {
    const lang = part.split(';')[0].trim().toLowerCase();
    const base = lang.split('-')[0];
    if (locales.includes(lang)) return lang;
    if (locales.includes(base)) return base;
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})/);
  const locale = localeMatch ? localeMatch[1] : null;

  // Protected dashboard routes
  const isDashboardRoute =
    pathname.includes('/admin') || pathname.includes('/(dashboard)');

  // Auth routes
  const isAuthRoute = pathname.includes('/auth/');

  // Handle dashboard protection
  if (isDashboardRoute && !isAuthRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no token or not admin, redirect to login
    if (!token || token.role !== 'admin') {
      const currentLocale = locale || routing.defaultLocale;
      const loginUrl = new URL(`/${currentLocale}/auth/login`, request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle auth routes - redirect to dashboard if already authenticated
  if (isAuthRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && token.role === 'admin') {
      const currentLocale = locale || routing.defaultLocale;
      return NextResponse.redirect(
        new URL(`/${currentLocale}/admin`, request.url)
      );
    }
  }

  // Handle root path locale redirection
  if (pathname === '/') {
    // 1) cookie
    const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

    // 2) Accept-Language header
    const acceptLang = request.headers.get('accept-language');
    const acceptLocale = getLocaleFromAcceptLanguage(
      acceptLang,
      routing.locales
    );

    // 3) fallback to default locale from routing
    const redirectLocale =
      cookieLocale || acceptLocale || routing.defaultLocale;

    // Redirect to the localized root (preserve query)
    url.pathname = `/${redirectLocale}`;
    return NextResponse.redirect(url);
  }

  // Handle paths without locale prefix
  if (!locale && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    // 1) cookie
    const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;

    // 2) Accept-Language header
    const acceptLang = request.headers.get('accept-language');
    const acceptLocale = getLocaleFromAcceptLanguage(
      acceptLang,
      routing.locales
    );

    // 3) fallback to default locale from routing
    const redirectLocale =
      cookieLocale || acceptLocale || routing.defaultLocale;

    // Redirect to the localized path (preserve query)
    url.pathname = `/${redirectLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
