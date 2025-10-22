import { Suspense } from 'react';
import BlogHero from '@/components/pages/blogPage/BlogHero';
import BlogGrid from '@/components/pages/blogPage/BlogGrid';
import BlogSidebar from '@/components/pages/blogPage/BlogSidebar';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Blog - Ahmed Abdelal',
  description:
    'Get in touch with Ahmed Abdelal for web development projects and collaborations.',
};

export default function BlogPage({ searchParams }) {
  const t = useTranslations('BlogPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Blog Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted rounded-lg h-64 mb-4"></div>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              }
            >
              <BlogGrid searchParams={searchParams} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
