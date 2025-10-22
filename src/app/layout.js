/**
 * Root layout component
 * Only handles fonts, theme provider, and analytics
 * No Header/Footer here - they go in nested layouts
 */
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Ahmed Abdelal - Full Stack Web Developer',
  description:
    'Professional Full Stack web developer specializing in modern web applications. View my portfolio, projects, and get in touch.',
  keywords: [
    'web developer',
    'UI designer',
    'portfolio',
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'NestJS',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'full stack',
    'frontend',
    'backend',
    'developer',
    'projects',
  ],
  authors: [{ name: 'Ahmed Abdelal' }],
  creator: 'Ahmed Abdelal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_EG', 'fr_FR'],
    url: 'https://ahmed-abdelal.com',
    title: 'Ahmed Abdelal - Full Stack Web Developer',
    description:
      'Professional Full Stack web developer specializing in modern web applications.',
    siteName: 'Ahmed Abdelal Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ahmed Abdelal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Abdelal - Full Stack Web Developer',
    description:
      'Professional Full Stack web developer specializing in modern web applications.',
    creator: '@ahmedabdelal',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
