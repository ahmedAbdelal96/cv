import reviews from '@/data/reviews.json';

export function getReviews(locale = 'en') {
  return reviews
    .filter((review) => review.published === true || review.approved === true)
    .map((review) => ({
      ...review,
      name: review.name?.[locale] || review.name,
      reviewText: review.reviewText?.[locale] || review.reviewText,
    }));
}
