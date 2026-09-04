'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export default function RelatedArticles({ currentSlug, articles = [], limit = 3 }) {
  const locale = useLocale();
  const t = useTranslations('ArticlePage.RelatedArticles');
  const related = articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-2xl font-bold text-foreground">{t('title')}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {related.map((article) => (
          <Link key={article.slug} href={`/${locale}/blog/${article.slug}`} className="group overflow-hidden rounded-xl border border-muted/50 bg-card">
            <div className="relative h-48">
              {article.featuredImage && <Image src={article.featuredImage} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />}
            </div>
            <div className="p-6">
              <h3 className="line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary">{article.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
