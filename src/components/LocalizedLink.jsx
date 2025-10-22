'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Small helper that prefixes local (from route param) to hrefs automatically.
export default function LocalizedLink({
  href = '/',
  children,
  replaceLocalIfPresent = true,
  ...props
}) {
  const params = useParams();
  const local = params?.local;

  // If href already starts with a supported locale (e.g. /en/...), don't double-prefix
  if (
    replaceLocalIfPresent &&
    typeof href === 'string' &&
    /^\/[a-z]{2}($|\/)/.test(href)
  ) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  const to = (() => {
    if (!local) return href;
    if (href === '/') return `/${local}`;
    return `/${local}${href}`;
  })();

  return (
    <Link href={to} {...props}>
      {children}
    </Link>
  );
}
