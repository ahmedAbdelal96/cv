'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'ar', name: 'العربية', label: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', label: 'FR', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const changeLanguage = (newLocale) => {
    startTransition(() => {
      document.cookie = 'locale=' + newLocale + '; path=/; max-age=31536000; SameSite=Lax';
      router.replace(pathname, { locale: newLocale });
    });
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-label="Change language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex h-9 sm:h-10 items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-2.5 sm:px-3 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-muted hover:border-primary/40 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline font-semibold">{currentLanguage.name}</span>
        <span className="text-sm sm:text-base leading-none" aria-hidden="true">
          {currentLanguage.flag}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute end-0 top-full z-50 mt-2 min-w-[170px] overflow-hidden rounded-xl border border-border/80 bg-popover p-1.5 text-popover-foreground shadow-xl backdrop-blur-md motion-safe:animate-in motion-safe:fade-in duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                role="menuitem"
                className={
                  'flex w-full items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-colors ' +
                  (isSelected
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground hover:bg-muted')
                }
              >
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span>{lang.name}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
