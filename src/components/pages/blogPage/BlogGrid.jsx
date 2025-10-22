'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';
import { useTranslations } from 'next-intl';
import { BookOpen, Filter, Search } from 'lucide-react';

// Mock data for demonstration (remove when using real API)
const mockArticles = [
  {
    _id: '1',
    title: 'Building Scalable APIs with NestJS and TypeScript',
    excerpt:
      'Learn how to create robust and scalable REST APIs using NestJS framework with TypeScript, dependency injection, and modern architecture patterns.',
    content: 'Full article content here...',
    slug: 'building-scalable-apis-nestjs-typescript',
    publishedDate: '2024-01-15',
    readTime: 8,
    tags: ['nestjs', 'typescript', 'nodejs', 'api'],
    category: 'backend',
    image: '/api/placeholder/400/250?text=NestJS+API',
    featured: true,
  },
  {
    _id: '2',
    title: 'Next.js 14 Performance Optimization Guide',
    excerpt:
      'Advanced techniques to optimize your Next.js applications including server components, caching strategies, and bundle optimization.',
    content: 'Full article content here...',
    slug: 'nextjs-14-performance-optimization',
    publishedDate: '2024-01-10',
    readTime: 6,
    tags: ['nextjs', 'react', 'performance', 'optimization'],
    category: 'frontend',
    image: '/api/placeholder/400/250?text=Next.js+Performance',
    featured: true,
  },
  {
    _id: '3',
    title: 'Microservices Architecture with Node.js and Docker',
    excerpt:
      'A comprehensive guide to building microservices with Node.js, containerization with Docker, and orchestration patterns.',
    content: 'Full article content here...',
    slug: 'microservices-architecture-nodejs-docker',
    publishedDate: '2024-01-05',
    readTime: 10,
    tags: ['nodejs', 'docker', 'microservices', 'architecture'],
    category: 'backend',
    image: '/api/placeholder/400/250?text=Microservices',
    featured: false,
  },
  {
    _id: '4',
    title: 'Advanced TypeScript Patterns for Full-Stack Development',
    excerpt:
      'Explore advanced TypeScript patterns including generics, conditional types, and type-safe APIs for full-stack applications.',
    content: 'Full article content here...',
    slug: 'advanced-typescript-patterns-fullstack',
    publishedDate: '2024-01-01',
    readTime: 7,
    tags: ['typescript', 'nodejs', 'react', 'patterns'],
    category: 'fullstack',
    image: '/api/placeholder/400/250?text=TypeScript+Patterns',
    featured: false,
  },
  {
    _id: '5',
    title: 'Database Optimization Strategies for MongoDB and PostgreSQL',
    excerpt:
      'Performance optimization techniques for both NoSQL and SQL databases including indexing, query optimization, and connection pooling.',
    content: 'Full article content here...',
    slug: 'database-optimization-mongodb-postgresql',
    publishedDate: '2023-12-28',
    readTime: 9,
    tags: ['mongodb', 'postgresql', 'database', 'performance'],
    category: 'backend',
    image: '/api/placeholder/400/250?text=Database+Optimization',
    featured: true,
  },
  {
    _id: '6',
    title: 'Building Real-time Applications with WebSockets and React',
    excerpt:
      'Implement real-time features in your React applications using WebSockets, Socket.IO, and modern state management patterns.',
    content: 'Full article content here...',
    slug: 'realtime-applications-websockets-react',
    publishedDate: '2023-12-25',
    readTime: 5,
    tags: ['react', 'websockets', 'nodejs', 'real-time'],
    category: 'fullstack',
    image: '/api/placeholder/400/250?text=Real-time+Apps',
    featured: false,
  },
];

export default function BlogGrid({ searchParams }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams?.category || '',
    tag: searchParams?.tag || '',
    search: searchParams?.search || '',
  });
  const t = useTranslations('BlogPage.BlogGrid');

  useEffect(() => {
    fetchArticles();
  }, [filters]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      // For demo purposes, using mock data
      // In production, use the API call below
      setTimeout(() => {
        let filteredArticles = [...mockArticles];

        // Apply filters
        if (filters.category && filters.category !== 'all') {
          filteredArticles = filteredArticles.filter(
            (article) => article.category === filters.category
          );
        }

        if (filters.tag) {
          filteredArticles = filteredArticles.filter((article) =>
            article.tags.some((tag) =>
              tag.toLowerCase().includes(filters.tag.toLowerCase())
            )
          );
        }

        if (filters.search) {
          filteredArticles = filteredArticles.filter(
            (article) =>
              article.title
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              article.excerpt
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              article.tags.some((tag) =>
                tag.toLowerCase().includes(filters.search.toLowerCase())
              )
          );
        }

        setArticles(filteredArticles);
        setLoading(false);
      }, 800);

      // Uncomment for real API:
      // const queryParams = new URLSearchParams()
      // if (filters.category) queryParams.append("category", filters.category)
      // if (filters.tag) queryParams.append("tag", filters.tag)
      // if (filters.search) queryParams.append("search", filters.search)

      // const res = await fetch(`/api/articles?${queryParams}`)
      // const data = await res.json()
      // setArticles(data.articles || [])
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      tag: '',
      search: '',
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading Filters */}
        <div className="animate-pulse">
          <div className="h-12 bg-muted rounded-lg mb-4"></div>
          <div className="h-10 bg-muted rounded-lg w-3/4 mx-auto"></div>
        </div>

        {/* Loading Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-6 border border-muted/50 animate-pulse"
            >
              <div className="h-48 bg-muted rounded-lg mb-4"></div>
              <div className="h-6 bg-muted rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-muted rounded mb-2 w-full"></div>
              <div className="h-4 bg-muted rounded mb-4 w-2/3"></div>
              <div className="flex gap-2 mb-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-6 bg-muted rounded w-16"></div>
                ))}
              </div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <BlogFilters filters={filters} setFilters={setFilters} />

      {/* Results Count and Reset */}
      {(filters.category || filters.tag || filters.search) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-muted/30 rounded-lg"
        >
          <div className="text-sm text-muted-foreground">
            {articles.length === 1
              ? '1 article found'
              : `${articles.length} articles found`}
          </div>
          <button
            onClick={resetFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {t('emptyState.reset')}
          </button>
        </motion.div>
      )}

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t('emptyState.title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('emptyState.description')}
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('emptyState.reset')}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
