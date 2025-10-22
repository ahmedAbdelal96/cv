/**
 * Locale layout component
 * Handles language-specific configurations
 */

import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  // Match the dynamic segment name [local]
  return routing.locales.map((local) => ({ local }));
}

export default async function LocaleLayout({ children, params }) {
  // params is async in Next App Router; await it before reading properties
  const { local } = await params;
  const locale = local;

  // validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // load messages for the locale
  const messages = await getMessages({ locale });

  // direction (RTL/LTR)
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div lang={locale} dir={dir} suppressHydrationWarning>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
