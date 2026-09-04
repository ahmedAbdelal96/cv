'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function DownloadCVButton({ className = '' }) {
  const cvPath = '/cv/Ahmed_Abdelal_CV.pdf';
  const locale = useLocale();
  const label =
    locale === 'ar' ? 'تحميل السيرة الذاتية' : locale === 'fr' ? 'Télécharger le CV' : 'Download CV';

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        asChild
        size="sm"
        className={`h-9 sm:h-10 rounded-xl px-4 text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs flex items-center gap-2 ${className}`}
      >
        <Link href={cvPath} download="Ahmed_Abdelal_CV.pdf">
          <Download className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </Button>
    </motion.div>
  );
}
