'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ReviewsCarousel({ reviews = [] }) {
  const t = useTranslations('HomePage.ReviewsCarousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!reviews.length) return null;
  const review = reviews[currentIndex];
  const move = (step) => setCurrentIndex((index) => (index + step + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">{t('title')}</p>
        <h2 className="mb-12 text-3xl font-bold text-foreground">{t('heading')}</h2>
        <div className="mx-auto max-w-4xl rounded-2xl border border-muted/50 bg-card p-8 shadow-lg">
          <div className="mb-6 flex justify-center">{[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-muted-foreground/30'}`} />)}</div>
          <blockquote className="mb-8 text-lg italic leading-relaxed text-muted-foreground">&quot;{review.reviewText}&quot;</blockquote>
          <p className="text-lg font-semibold text-foreground">{review.name}</p>
          {review.company && <p className="mt-1 text-sm text-primary">{review.company}</p>}
          {reviews.length > 1 && <div className="mt-8 flex items-center justify-center gap-6"><Button variant="outline" size="icon" onClick={() => move(-1)} aria-label={t('navigation.previous')}><ChevronLeft /></Button><span className="text-sm text-muted-foreground">{currentIndex + 1} / {reviews.length}</span><Button variant="outline" size="icon" onClick={() => move(1)} aria-label={t('navigation.next')}><ChevronRight /></Button></div>}
        </div>
      </div>
    </section>
  );
}
