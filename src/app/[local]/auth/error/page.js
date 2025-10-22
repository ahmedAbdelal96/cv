/**
 * Authentication Error Page
 * Displays authentication errors
 */
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

const errorMessages = {
  default: 'An error occurred during authentication.',
  configuration: 'Server configuration error.',
  accessdenied:
    'Access denied. You do not have permission to access this resource.',
  verification: 'Verification failed. The token may have expired.',
  signin: 'Error occurred during sign in.',
  oauthsignin: 'Error occurred during OAuth sign in.',
  oauthcallback: 'Error occurred during OAuth callback.',
  oauthcreateaccount: 'Error occurred creating OAuth account.',
  emailcreateaccount: 'Error occurred creating email account.',
  callback: 'Error occurred in callback.',
  oauthaccountnotlinked: 'OAuth account not linked.',
  emailsignin: 'Error occurred during email sign in.',
  credentialssignin:
    'Invalid credentials. Please check your email and password.',
  sessionrequired: 'You must be signed in to access this page.',
};

export default function AuthErrorPage({ params }) {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'default';
  const { locale } = params;

  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Error Icon */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {errorMessage}
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-sm text-red-700 dark:text-red-300">
            <p>
              <strong>Error Code:</strong> {error}
            </p>
            <p className="mt-2">{errorMessage}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href={`/${locale}/auth/login`}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Try Again
          </Link>

          <Link
            href={`/${locale}`}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            If this problem persists, please contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
