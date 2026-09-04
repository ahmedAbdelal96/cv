'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Heart,
  Bookmark,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ArticleContent({ article }) {
  const t = useTranslations('ArticlePage.ArticleContent');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(article.likes || 0);

  const formatDate = (date) => {
    if (!date || Number.isNaN(new Date(date).getTime())) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Fix: Safely get author name
  const getAuthorName = () => {
    if (!article.author) return t('author');

    if (typeof article.author === 'string') {
      return article.author;
    }

    if (typeof article.author === 'object' && article.author.name) {
      return article.author.name;
    }

    return t('author');
  };

  // Fix: Safely get author avatar if needed
  const getAuthorAvatar = () => {
    if (typeof article.author === 'object' && article.author.avatar) {
      return article.author.avatar;
    }
    return null;
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert(t('share.urlCopied'));
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative h-64 md:h-96">
          <Image
            src={article.featuredImage || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="bg-teal-600 text-white px-3 py-1 rounded-full font-medium">
              {article.category}
            </span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.publishedDate)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {t('readTime', { minutes: article.readTime })}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {/* Fix: Use the safe author name function */}
              {getAuthorName()}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Article Actions */}
        <div className="flex items-center justify-between border-y border-gray-200 dark:border-gray-700 py-4 mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              aria-label={t('actions.like')}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{t('likeButton.default', { count: likes })}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              aria-label={t('actions.save')}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
              />
              <span>
                {isBookmarked ? t('saveButton.saved') : t('saveButton.default')}
              </span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            aria-label={t('actions.share')}
          >
            <Share2 className="w-4 h-4" />
            <span>{t('shareButton')}</span>
          </button>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('tagsTitle')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-400 transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
