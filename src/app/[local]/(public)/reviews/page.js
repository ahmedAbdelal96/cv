import ReviewsHero from '@/components/ReviewsHero';
import ReviewsGrid from '@/components/ReviewsGrid';
import ReviewForm from '@/components/ReviewForm';

export const metadata = {
  title: 'Reviews - Ahmed Abdelal',
  description:
    "Client testimonials and reviews for Ahmed Abdelal's web development services.",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ReviewsHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ReviewsGrid />

        <div className="mt-16">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
