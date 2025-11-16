/* eslint-disable jsx-a11y/click-events-have-key-events */
// ========================================
// 🔄 7️⃣ مبدل اللغات (Language Switcher) 🇸🇦🇬🇧🇫🇷
// ========================================

// src/components/common/LanguageSwitcher.js
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useTransition } from 'react';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (newLocale) => {
    startTransition(() => {
      // Set cookie to persist language choice
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.replace(pathname, { locale: newLocale });
    });
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  // Close dropdown when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-label="Change language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <span className="text-lg">{currentLanguage?.flag}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Menu */}
          <div
            className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  role="menuitem"
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    locale === lang.code
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <span>{lang.name}</span>
                  </div>
                  {locale === lang.code && (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
