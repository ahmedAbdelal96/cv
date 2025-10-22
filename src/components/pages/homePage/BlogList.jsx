/**
 * Blog list component
 * Displays technical articles in a grid layout
 */
"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Code, BookOpen } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useTranslations } from "next-intl"

// Mock data for demonstration (remove when using real API)
const mockArticles = [
  {
    _id: "1",
    title: "Building Scalable APIs with NestJS and TypeScript",
    excerpt: "Learn how to create robust and scalable REST APIs using NestJS framework with TypeScript, dependency injection, and modern architecture patterns.",
    content: "Full article content here...",
    slug: "building-scalable-apis-nestjs-typescript",
    publishedDate: "2024-01-15",
    readTime: 8,
    tags: ["nest", "typescript", "nodejs", "bestPractices"],
    image: "/api/placeholder/400/200?text=NestJS+API"
  },
  {
    _id: "2",
    title: "Next.js 14 Performance Optimization Guide",
    excerpt: "Advanced techniques to optimize your Next.js applications including server components, caching strategies, and bundle optimization.",
    content: "Full article content here...",
    slug: "nextjs-14-performance-optimization",
    publishedDate: "2024-01-10",
    readTime: 6,
    tags: ["nextjs", "react", "performance", "bestPractices"],
    image: "/api/placeholder/400/200?text=Next.js+Performance"
  },
  {
    _id: "3",
    title: "Microservices Architecture with Node.js and Docker",
    excerpt: "A comprehensive guide to building microservices with Node.js, containerization with Docker, and orchestration patterns.",
    content: "Full article content here...",
    slug: "microservices-architecture-nodejs-docker",
    publishedDate: "2024-01-05",
    readTime: 10,
    tags: ["nodejs", "docker", "aws", "architecture"],
    image: "/api/placeholder/400/200?text=Microservices"
  },
  {
    _id: "4",
    title: "Advanced TypeScript Patterns for Full-Stack Development",
    excerpt: "Explore advanced TypeScript patterns including generics, conditional types, and type-safe APIs for full-stack applications.",
    content: "Full article content here...",
    slug: "advanced-typescript-patterns-fullstack",
    publishedDate: "2024-01-01",
    readTime: 7,
    tags: ["typescript", "nodejs", "react", "bestPractices"],
    image: "/api/placeholder/400/200?text=TypeScript+Patterns"
  },
  {
    _id: "5",
    title: "Database Optimization Strategies for MongoDB and PostgreSQL",
    excerpt: "Performance optimization techniques for both NoSQL and SQL databases including indexing, query optimization, and connection pooling.",
    content: "Full article content here...",
    slug: "database-optimization-mongodb-postgresql",
    publishedDate: "2023-12-28",
    readTime: 9,
    tags: ["mongodb", "postgresql", "performance", "database"],
    image: "/api/placeholder/400/200?text=Database+Optimization"
  },
  {
    _id: "6",
    title: "Building Real-time Applications with WebSockets and React",
    excerpt: "Implement real-time features in your React applications using WebSockets, Socket.IO, and modern state management patterns.",
    content: "Full article content here...",
    slug: "realtime-applications-websockets-react",
    publishedDate: "2023-12-25",
    readTime: 5,
    tags: ["react", "nodejs", "websockets", "real-time"],
    image: "/api/placeholder/400/200?text=Real-time+Apps"
  }
]

export default function BlogList({ preview = false }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations('HomePage.BlogList')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // For demo purposes, using mock data
        // In production, use: const response = await fetch("/api/articles?published=true")
        setTimeout(() => {
          setArticles(preview ? mockArticles.slice(0, 3) : mockArticles)
          setLoading(false)
        }, 1000)
        
        // Uncomment for real API:
        // const response = await fetch("/api/articles?published=true")
        // const data = await response.json()
        // if (data.success) {
        //   setArticles(preview ? data.data.slice(0, 3) : data.data)
        // }
      } catch (error) {
        console.error("Error fetching articles:", error)
        // Fallback to mock data
        setArticles(preview ? mockArticles.slice(0, 3) : mockArticles)
        setLoading(false)
      }
    }

    fetchArticles()
  }, [preview])

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-32 mx-auto mb-4"></div>
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-12"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(preview ? 3 : 6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {t('emptyState.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('emptyState.description')}
              </p>
              <Button asChild>
                <Link href="/projects">
                  {t('emptyState.button')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('title')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {preview ? t('heading.preview') : t('heading.all')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-muted/50 hover:border-primary/20"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={article.image || "/api/placeholder/400/200?text=Tech+Article"}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Code className="h-6 w-6 text-white/90 drop-shadow-lg" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.publishedDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{t('meta.readTime', { minutes: article.readTime || 5 })}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/blog/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt || article.content?.substring(0, 150) + "..."}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                      >
                        {t(`tags.${tag}`, { defaultValue: tag })}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors group-hover:translate-x-1 duration-300"
                >
                  {t('buttons.readMore')}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {preview && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                {t('buttons.viewAll')}
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}