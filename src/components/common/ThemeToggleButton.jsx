'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-border/70 bg-card/50" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card/70 text-foreground backdrop-blur-md shadow-xs transition-all duration-200 hover:bg-muted hover:border-primary/40 hover:text-primary active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -10, opacity: 0, rotate: -20 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 20 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-slate-700 dark:text-slate-200" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
