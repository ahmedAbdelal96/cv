'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';
import { useTranslations } from 'next-intl';
import { BookOpen } from 'lucide-react';

export default function BlogGrid({ articles: initialArticles = [] }) {
  const t = useTranslations('BlogPage.BlogGrid');
  const [filters, setFilters] = useState({ category: '', tag: '', search: '' });
  const articles = useMemo(() => initialArticles.filter((article) => {
    const search = filters.search.toLowerCase();
    return (!filters.category || filters.category === 'all' || article.category === filters.category) &&
      (!filters.tag || article.tags?.includes(filters.tag)) &&
      (!search || `${article.title} ${article.excerpt} ${article.content}`.toLowerCase().includes(search));
  }), [initialArticles, filters]);

  return (
    <div className="space-y-8">
      <BlogFilters filters={filters} setFilters={setFilters} />
      {articles.length === 0 ? (
        <div className="py-16 text-center">
          <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <h3 className="mb-2 text-xl font-semibold text-foreground">{t('emptyState.title')}</h3>
          <p className="text-muted-foreground">{t('emptyState.description')}</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {articles.map((article) => <BlogCard key={article.slug} article={article} />)}
        </motion.div>
      )}
    </div>
  );
}
