import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const LOCALE_COOKIE_NAME = 'locale'; // change if your app uses a different cookie

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

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Skip internal and static routes (don't intercept _next, API, static files, or common assets)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    // skip requests for files with extensions (e.g. /some/path/file.png)
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If the path already starts with a supported locale, allow it
  const locales = routing.locales as readonly string[];
  const localePrefixRegex = new RegExp(`^/(${locales.join('|')})(/|$)`);
  if (localePrefixRegex.test(pathname)) return NextResponse.next();

  // Determine locale: cookie -> Accept-Language -> default
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const acceptLang = request.headers.get('accept-language');
  const acceptLocale = getLocaleFromAcceptLanguage(acceptLang, locales);
  const locale = cookieLocale || acceptLocale || routing.defaultLocale;

  // Redirect to the localized path, preserving search params
  url.pathname = `/${locale}${pathname}`;
  const res = NextResponse.redirect(url);
  // Persist the chosen locale so subsequent requests can use it
  try {
    res.cookies.set(LOCALE_COOKIE_NAME, locale);
  } catch (e) {
    // cookies on NextResponse may not be available in some environments; ignore silently
  }
  return res;
}

// Run middleware for all paths so we can redirect non-prefixed routes; internal filtering is performed above
export const config = {
  matcher: ['/(.*)'],
};
