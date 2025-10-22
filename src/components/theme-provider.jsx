/**
 * Theme provider component
 * Wraps the app with theme context
 */
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class" // يحط الـ theme كـ class على <html>
      defaultTheme="system" // يستخدم theme النظام (light/dark)
      enableSystem={true} // يفعّل قراءة theme النظام
      disableTransitionOnChange // يمنع فلاش أثناء تغيير الثيم
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
