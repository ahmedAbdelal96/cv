// src/app/[local]/(public)/blog/[slug]/page.js (Final Version)
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ArticleContent from '@/components/pages/articalePage/ArticleContent';
import ArticleSidebar from '@/components/pages/articalePage/ArticleSidebar';
import RelatedArticles from '@/components/pages/articalePage/RelatedArticles';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { getArticleBySlug, getArticleSlugs, getArticles } from '@/lib/data/articles';

export function generateStaticParams() {
  return ['en', 'ar', 'fr'].flatMap((local) =>
    getArticleSlugs().map((slug) => ({ local, slug }))
  );
}

export async function generateMetadata({ params }) {
  const { local, slug } = await params;
  const t = await getTranslations({
    locale: local,
    namespace: 'ArticlePage',
  });
  const article = getArticleBySlug(slug, local);

  if (!article) {
    return {
      title: t('notFound.title'),
    };
  }

  return {
    title: `${article.title}${t('metadata.titleSuffix')}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author?.name || 'Ahmed Abdelal'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { local, slug } = await params;
  const article = getArticleBySlug(slug, local);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: article.title, href: `/blog/${article.slug}`, current: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-muted/30 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="animate-pulse space-y-6">
                  <div className="h-10 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 bg-muted rounded w-full"
                      ></div>
                    ))}
                  </div>
                </div>
              }
            >
              <ArticleContent article={article} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense
              fallback={
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-muted rounded-xl p-6 h-32"
                    ></div>
                  ))}
                </div>
              }
            >
              <ArticleSidebar article={article} />
            </Suspense>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 border-t border-muted/30 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Related Articles
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Continue your learning journey with these related technical
              articles
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-muted rounded-lg mb-4"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            }
          >
            <RelatedArticles
              currentSlug={slug}
              tags={article.tags}
              category={article.category}
              limit={3}
              articles={getArticles(local)}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
