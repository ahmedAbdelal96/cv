'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

export default function ProjectsHero() {
  const locale = useLocale();
  const copy =
    {
      en: {
        eyebrow: 'Selected Work',
        title: 'Selected Projects & Case Studies',
        description:
          'A curated selection of business systems, digital platforms, e-commerce solutions, and web products I have engineered and designed.',
      },
      ar: {
        eyebrow: 'أعمال مختارة',
        title: 'مشاريع مختارة ودراسات حالة',
        description:
          'مجموعة من أنظمة الأعمال والمنصات الرقمية والمتاجر الإلكترونية والحلول البرمجية التي صممتها وطورتها.',
      },
      fr: {
        eyebrow: 'Réalisations sélectionnées',
        title: 'Projets sélectionnés et études de cas',
        description:
          'Une sélection de systèmes métier, plateformes numériques, solutions e-commerce et produits web conçus et développés.',
      },
    }[locale] || {};

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/20 via-background to-background pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{copy.eyebrow}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            {copy.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            {copy.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
