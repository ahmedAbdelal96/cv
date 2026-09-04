'use client';

import { motion } from 'framer-motion';
import ReviewCard from './ReviewCard';

export default function ReviewsGrid({ reviews = [] }) {
  if (!reviews.length) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, index) => (
        <motion.div key={review._id || review.id || index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
          <ReviewCard review={review} />
        </motion.div>
      ))}
    </motion.div>
  );
}
