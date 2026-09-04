// components/ArticleSidebar.js
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ArticleSidebar({ article }) {
  const t = useTranslations('ArticlePage.ArticleSidebar');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Article Info */}
      <div className="bg-card rounded-xl p-6 border border-muted/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {t('articleDetails')}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t('published')}:</span>
            <span className="text-foreground">
              {new Date(article.publishedDate || article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{t('readTime')}:</span>
            <span className="text-foreground">
              {article.readTime} {t('readTime')}
            </span>
          </div>

          {article.category && (
            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('category')}:</span>
              <span className="text-foreground capitalize">
                {article.category}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="w-full mt-4 flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          {t('shareArticle')}
        </Button>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="bg-card rounded-xl p-6 border border-muted/50">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            {t('tags')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium hover:bg-primary/20 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Table of Contents (if article has headings) */}
      <div className="bg-card rounded-xl p-6 border border-muted/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('tableOfContents')}
        </h3>
        <div className="space-y-2 text-sm">
          {/* This would be dynamically generated based on article headings */}
          <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            {t('tocItems.introduction')}
          </div>
          <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            {t('tocItems.gettingStarted')}
          </div>
          <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            {t('tocItems.implementation')}
          </div>
          <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            {t('tocItems.bestPractices')}
          </div>
          <div className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            {t('tocItems.conclusion')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
