// components/RelatedArticles.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Calendar, Clock } from 'lucide-react';

// Mock data for related articles
const mockRelatedArticles = [
  {
    _id: '2',
    title: 'Next.js 14 Performance Optimization Guide',
    excerpt:
      'Advanced techniques to optimize your Next.js applications including server components and caching strategies.',
    slug: 'nextjs-14-performance-optimization',
    publishedDate: '2024-01-10',
    readTime: 6,
    category: 'frontend',
    featuredImage: '/api/placeholder/400/250?text=Next.js+Performance',
  },
  {
    _id: '3',
    title: 'Microservices Architecture with Node.js',
    excerpt:
      'A comprehensive guide to building microservices with Node.js and Docker containerization.',
    slug: 'microservices-architecture-nodejs',
    publishedDate: '2024-01-05',
    readTime: 10,
    category: 'backend',
    featuredImage: '/api/placeholder/400/250?text=Microservices',
  },
  {
    _id: '4',
    title: 'Advanced TypeScript Patterns',
    excerpt:
      'Explore advanced TypeScript patterns including generics and conditional types for full-stack applications.',
    slug: 'advanced-typescript-patterns',
    publishedDate: '2024-01-01',
    readTime: 7,
    category: 'fullstack',
    featuredImage: '/api/placeholder/400/250?text=TypeScript+Patterns',
  },
];

async function getRelatedArticles(
  currentSlug,
  tags = [],
  category = '',
  limit = 3
) {
  // In a real app, you'd fetch from your API
  // For now, return mock data filtered by category/tags
  return mockRelatedArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);
}

export default function RelatedArticles({
  currentSlug,
  tags,
  category,
  limit = 3,
}) {
  const t = useTranslations('ArticlePage.RelatedArticles');

  // Since this is a client component with async data, we need to handle the data differently
  // You might want to move the data fetching to a parent component or use useEffect
  const relatedArticles = mockRelatedArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-8">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedArticles.map((article, index) => (
          <motion.article
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${article.slug}`}>
              <div className="bg-card rounded-xl overflow-hidden border border-muted/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publishedDate).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('readTime', { minutes: article.readTime })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
