/**
 * Auth layout component
 * Specialized layout for login, register, forgot password pages
 * Minimal design focused on authentication forms
 */
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted">
      {/* Logo or Back to Home */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Auth Form Container */}
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Ahmed Abdelal</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Full Stack Web Developer
          </p>
        </div>

        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Ahmed Abdelal. All rights reserved.</p>
      </div>
    </div>
  );
}
