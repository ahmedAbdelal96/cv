/**
 * Reviews carousel component
 * Displays client testimonials in a sliding carousel
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

// Mock data for demonstration (remove when using real API)
const mockReviews = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    reviewText:
      'Ahmed delivered an exceptional full-stack application that exceeded our expectations. His attention to detail and technical expertise in React and Node.js is impressive.',
    rating: 5,
    company: 'Tech Startup Inc.',
    project: 'E-commerce Platform',
  },
  {
    _id: '2',
    name: 'Michael Chen',
    reviewText:
      'Working with Ahmed was a game-changer for our project. His backend architecture with NestJS and PostgreSQL scaled perfectly with our growing user base.',
    rating: 5,
    company: 'Enterprise Solutions',
    project: 'CRM System',
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    reviewText:
      'The frontend Ahmed built with Next.js and TypeScript is both beautiful and highly performant. His code is clean, maintainable, and well-documented.',
    rating: 4,
    company: 'Digital Agency',
    project: 'Admin Dashboard',
  },
  {
    _id: '4',
    name: 'David Thompson',
    reviewText:
      "Ahmed's full-stack skills are outstanding. He handled everything from database design to deployment on AWS. Highly recommended for complex projects.",
    rating: 5,
    company: 'FinTech Company',
    project: 'Banking App',
  },
];

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('HomePage.ReviewsCarousel');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // For demo purposes, using mock data
        // In production, use: const response = await fetch("/api/reviews?approved=true")
        setTimeout(() => {
          setReviews(mockReviews);
          setLoading(false);
        }, 1000);

        // Uncomment for real API:
        // const response = await fetch("/api/reviews?approved=true")
        // const data = await response.json()
        // if (data.success) {
        //   setReviews(data.data)
        // }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to mock data
        setReviews(mockReviews);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (loading) {
    return (
      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mx-auto mb-4"></div>
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-12"></div>
              <div className="max-w-2xl mx-auto">
                <div className="h-32 bg-muted rounded-lg mb-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-md mx-auto">
              <MessageCircle className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {t('emptyState.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('emptyState.description')}
              </p>
              <Button asChild>
                <a href="#contact">{t('emptyState.button')}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 bg-muted/30">
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
            {t('heading')}
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-muted/50 hover:shadow-xl transition-shadow duration-300">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < reviews[currentIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-8 leading-relaxed">
                  &quot;{reviews[currentIndex].reviewText}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                    {reviews[currentIndex].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-lg">
                      {reviews[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('verifiedClient')}
                    </p>
                    {reviews[currentIndex].company && (
                      <p className="text-xs text-primary font-medium mt-1">
                        {reviews[currentIndex].company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {reviews.length > 1 && (
            <div className="flex justify-center items-center space-x-6 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={prevReview}
                className="rounded-full bg-background border-muted hover:bg-muted/50"
                aria-label={t('navigation.previous')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex space-x-3">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary scale-125'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={t('navigation.goToReview', {
                      index: index + 1,
                    })}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextReview}
                className="rounded-full bg-background border-muted hover:bg-muted/50"
                aria-label={t('navigation.next')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Review Counter */}
          {reviews.length > 1 && (
            <div className="text-center mt-6">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {reviews.length}
              </span>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">{t('readyToStart')}</p>
          <Button asChild size="lg">
            <a href="#contact">{t('startWorkingTogether')}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
