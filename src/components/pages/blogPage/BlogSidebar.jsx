// components/BlogSidebar.js (with locale-aware dates)
'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Code, TrendingUp, Clock, Tag } from 'lucide-react';

const popularTags = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'AWS',
  'Docker',
  'Performance',
  'Security',
  'Best Practices',
];

const recentPosts = [
  { key: 'nestjs', date: '2024-01-15' },
  { key: 'nextjs', date: '2024-01-10' },
  { key: 'microservices', date: '2024-01-05' },
];

export default function BlogSidebar() {
  const t = useTranslations('BlogPage.BlogSidebar');
  const locale = useLocale();

  // Locale-aware date formatting
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (locale === 'ar') {
      // Arabic date format
      return new Intl.DateTimeFormat('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    }

    // English date format
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* About Blog */}
      <div className="bg-card rounded-xl p-6 border border-muted/50">
        <div className="flex items-center gap-3 mb-4">
          <Code className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {t('about.title')}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t('about.description')}
        </p>
      </div>

      {/* Popular Tags */}
      <div className="bg-card rounded-xl p-6 border border-muted/50">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {t('popularTags')}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-card rounded-xl p-6 border border-muted/50">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {t('recentPosts')}
          </h3>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post, index) => (
            <div key={post.key} className="group cursor-pointer">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {t(`posts.${post.key}`)}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(post.date)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
