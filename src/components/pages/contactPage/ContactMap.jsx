'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ContactMap() {
  const t = useTranslations('ContactPage.ContactMap');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h3>
      </div>

      <div className="h-64 bg-gray-200 dark:bg-gray-700 relative">
        {/* Placeholder for map - in a real app, you'd integrate with Google Maps or similar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {t('location')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('availability')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
