// components/BlogFilters.js
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = [
  'all',
  'frontend',
  'backend',
  'fullstack',
  'devops',
  'tutorial',
  'bestPractices',
];

export default function BlogFilters({ filters, setFilters }) {
  const t = useTranslations('BlogPage.BlogGrid');

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: '',
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={t('filters.searchPlaceholder')}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 pr-10"
        />
        {filters.search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filters.category === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateFilter('category', category)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {t(`categories.${category}`)}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
