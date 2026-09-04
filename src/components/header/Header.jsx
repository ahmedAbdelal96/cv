/**
 * Header component with navigation
 * Responsive navigation bar with theme toggle and language switcher
 */
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggleButton from '@/components/common/ThemeToggleButton';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import DownloadCVButton from '@/components/common/DownloadCVButton';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const navigation = [
  { name: 'home', href: '/' },
  { name: 'about', href: '/about' },
  { name: 'projects', href: '/projects' },
  { name: 'blog', href: '/blog' },
  { name: 'contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const local = params?.local || '';
  const t = useTranslations('Header');
  const localizedHref = (href) => `/${local}${href === '/' ? '' : href}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    const normalizedPath =
      local && pathname?.startsWith(`/${local}`)
        ? pathname.replace(new RegExp(`^/${local}`), '') || '/'
        : pathname || '/';

    if (href === '/') {
      return normalizedPath === '/';
    }
    return normalizedPath.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-background/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href={localizedHref('/')} className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-xs">
                AA
              </div>
              <span className="hidden font-bold text-lg sm:text-xl sm:inline-block text-foreground">
                {t('logo')}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={localizedHref(item.href)}
                  className={`nav-link px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'active font-semibold text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {t(`navigation.${item.name}`)}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-2.5"
          >
            <LanguageSwitcher />
            <ThemeToggleButton />
            <div className="ms-1">
              <DownloadCVButton />
            </div>
          </motion.div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggleButton />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t('menu.toggle')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center gap-2.5 pb-4 border-b">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                      AA
                    </div>
                    <span className="font-bold text-xl">{t('logo')}</span>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={localizedHref(item.href)}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {t(`navigation.${item.name}`)}
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-4 border-t">
                    <DownloadCVButton className="w-full" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
