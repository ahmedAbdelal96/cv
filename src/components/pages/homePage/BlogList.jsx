'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import BlogCard from '@/components/pages/blogPage/BlogCard';

export default function BlogList({ articles = [], preview = false }) {
  const t = useTranslations('HomePage.BlogList');
  const visibleArticles = preview ? articles.slice(0, 3) : articles;
  if (!visibleArticles.length) return null;

  return (
    <section id="blog" className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">{t('title')}</p>
          <h2 className="text-3xl font-bold text-foreground">{t('heading.preview')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => <BlogCard key={article.slug} article={article} />)}
        </div>
        {preview && <div className="mt-10 text-center"><Link href="/blog" className="text-primary hover:underline">{t('buttons.viewAll')}</Link></div>}
      </div>
    </section>
  );
}
