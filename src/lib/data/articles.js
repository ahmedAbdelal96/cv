import articles from '@/data/articles.json';

const localized = (value, locale) => {
  if (value && typeof value === 'object') return value[locale] || value.en || value.ar || '';
  return value || '';
};

export function normalizeArticle(article, locale = 'en') {
  return {
    ...article,
    title: localized(article.title, locale),
    excerpt: localized(article.excerpt, locale),
    description: localized(article.description, locale),
    content: localized(article.content, locale),
    publishedDate: article.publishedDate || article.publishedAt || null,
    image: article.image || article.featuredImage || '',
    featuredImage: article.featuredImage || article.image || '',
  };
}

export function getArticles(locale = 'en', options = {}) {
  const { category, tag, search } = options;
  return articles
    .filter((article) => article.published !== false)
    .filter((article) => !category || article.category === category)
    .filter((article) => !tag || article.tags?.includes(tag))
    .filter((article) => !search || JSON.stringify(article).toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0))
    .map((article) => normalizeArticle(article, locale));
}

export function getArticleBySlug(slug, locale = 'en') {
  const article = articles.find((item) => item.published !== false && item.slug === slug);
  return article ? normalizeArticle(article, locale) : null;
}

export function getArticleSlugs() {
  return articles.filter((article) => article.published !== false).map(({ slug }) => slug);
}
