/**
 * Blog Management Page
 * Manage blog articles and posts
 */
'use client';

import { useState, useEffect, use } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  GlobeAltIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function BlogPage({ params }) {
  const { local } = use(params);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    readTime: 5,
    published: false,
    featured: false,
    image: '',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    author: {
      name: 'Ahmed Abdelal',
      avatar: '/placeholder-user.png',
    },
  });

  // Fetch articles
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');
      const data = await response.json();

      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = selectedArticle
        ? `/api/articles/${selectedArticle.slug}`
        : '/api/articles';

      const method = selectedArticle ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          slug: formData.slug || generateSlug(formData.title),
        }),
      });

      if (response.ok) {
        fetchArticles();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  // Delete article
  const deleteArticle = async (slug) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter((article) => article.slug !== slug));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Toggle publish status
  const togglePublish = async (article) => {
    try {
      const response = await fetch(`/api/articles/${article.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !article.published }),
      });

      if (response.ok) {
        setArticles(
          articles.map((a) =>
            a.slug === article.slug ? { ...a, published: !a.published } : a
          )
        );
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      readTime: 5,
      published: false,
      featured: false,
      image: '',
      featuredImage: '',
      metaTitle: '',
      metaDescription: '',
      author: {
        name: 'Ahmed Abdelal',
        avatar: '/placeholder-user.png',
      },
    });
    setSelectedArticle(null);
  };

  // Edit article
  const editArticle = (article) => {
    setSelectedArticle(article);
    setFormData({
      ...article,
      tags: article.tags?.join(', ') || '',
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Article Card Component
  const ArticleCard = ({ article }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
      {/* Article Image */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            {article.featured && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                article.published
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {article.published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {article.description}
        </p>

        {/* Category & Tags */}
        <div className="space-y-2 mb-4">
          {article.category && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                {article.category}
              </span>
            </div>
          )}

          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{article.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {article.publishedDate
              ? new Date(article.publishedDate).toLocaleDateString()
              : 'No date'}
          </div>
          <div className="flex items-center">
            <EyeIcon className="h-3 w-3 mr-1" />
            {article.views || 0} views
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <button
              onClick={() => togglePublish(article)}
              className={`text-xs px-3 py-1 rounded ${
                article.published
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {article.published ? 'Unpublish' : 'Publish'}
            </button>
            {article.slug && (
              <a
                href={`/${local}/blog/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded flex items-center"
              >
                <GlobeAltIcon className="h-3 w-3 mr-1" />
                View
              </a>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => editArticle(article)}
              className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => deleteArticle(article.slug)}
              className="p-1 text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Blog Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage your blog articles
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Article</span>
        </button>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse"
            ></div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No articles
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating your first blog post.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white dark:bg-gray-800 max-h-screen overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedArticle ? 'Edit Article' : 'Create New Article'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({
                        ...formData,
                        title,
                        slug: formData.slug || generateSlug(title),
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Brief description of the article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Excerpt
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Short excerpt for preview"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content * (Supports Markdown)
                </label>
                <textarea
                  required
                  rows={10}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                  placeholder="Write your article content here using Markdown..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., frontend, backend"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        readTime: parseInt(e.target.value) || 5,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="react, nextjs, javascript"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featuredImage: e.target.value,
                      })
                    }
                    placeholder="https://example.com/featured.jpg"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Published
                  </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Featured
                  </span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedArticle ? 'Update' : 'Create'} Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
