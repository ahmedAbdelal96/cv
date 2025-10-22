/**
 * Reviews Management Page
 * Moderate and manage user reviews and testimonials
 */
'use client';

import { useState, useEffect } from 'react';
import {
  StarIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  UserCircleIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function ReviewsPage({ params }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);

  // Fetch reviews
  const fetchReviews = async (filterType = 'all') => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');
      const data = await response.json();

      if (data.success) {
        let filteredReviews = data.data;

        if (filterType === 'pending') {
          filteredReviews = filteredReviews.filter(
            (review) => !review.approved
          );
        } else if (filterType === 'approved') {
          filteredReviews = filteredReviews.filter((review) => review.approved);
        } else if (filterType === 'featured') {
          filteredReviews = filteredReviews.filter((review) => review.featured);
        }

        setReviews(filteredReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Approve review
  const approveReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      });

      if (response.ok) {
        setReviews(
          reviews.map((review) =>
            review._id === reviewId ? { ...review, approved: true } : review
          )
        );
      }
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  // Reject review
  const rejectReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false }),
      });

      if (response.ok) {
        setReviews(
          reviews.map((review) =>
            review._id === reviewId ? { ...review, approved: false } : review
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  // Toggle featured status
  const toggleFeatured = async (reviewId) => {
    const review = reviews.find((r) => r._id === reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !review.featured }),
      });

      if (response.ok) {
        setReviews(
          reviews.map((r) =>
            r._id === reviewId ? { ...r, featured: !r.featured } : r
          )
        );
      }
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  // Delete review
  const deleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
        setSelectedReview(null);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  useEffect(() => {
    fetchReviews(filter);
  }, [filter]);

  // Star Rating Component
  const StarRating = ({ rating, size = 'w-4 h-4' }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIconSolid
          key={star}
          className={`${size} ${
            star <= rating
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );

  // Review Card Component
  const ReviewCard = ({ review }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${
        review.approved ? 'border-green-500' : 'border-yellow-500'
      } ${!review.approved ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}
      onClick={() => setSelectedReview(review)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {review.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {review.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {review.position} {review.company && `at ${review.company}`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {review.featured && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                review.approved
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {review.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <StarRating rating={review.rating} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {review.rating}/5
          </span>
        </div>

        {/* Review Text */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {review.review}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {new Date(review.createdAt).toLocaleDateString()}
          </div>

          <div className="flex space-x-2">
            {!review.approved ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    approveReview(review._id);
                  }}
                  className="p-1 text-green-600 hover:text-green-700 dark:text-green-400"
                  title="Approve"
                >
                  <CheckIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rejectReview(review._id);
                  }}
                  className="p-1 text-red-600 hover:text-red-700 dark:text-red-400"
                  title="Reject"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFeatured(review._id);
                }}
                className={`p-1 ${
                  review.featured
                    ? 'text-yellow-600 hover:text-yellow-700'
                    : 'text-gray-400 hover:text-yellow-600'
                }`}
                title={
                  review.featured ? 'Remove from featured' : 'Add to featured'
                }
              >
                <StarIcon className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteReview(review._id);
              }}
              className="p-1 text-red-600 hover:text-red-700 dark:text-red-400"
              title="Delete"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Review Detail Component
  const ReviewDetail = ({ review }) => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Review Details
        </h2>
        <button
          onClick={() => setSelectedReview(null)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Reviewer Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-xl font-medium text-gray-700 dark:text-gray-300">
              {review.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {review.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {review.position} {review.company && `at ${review.company}`}
            </p>
            {review.email && (
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {review.email}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-3 mb-3">
          <StarRating rating={review.rating} size="w-5 h-5" />
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {review.rating}/5
          </span>
        </div>

        {/* Status badges */}
        <div className="flex space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              review.approved
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {review.approved ? 'Approved' : 'Pending'}
          </span>
          {review.featured && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Review
        </h3>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {review.review}
          </p>
        </div>
      </div>

      {/* Project info if available */}
      {review.project && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Project
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{review.project}</p>
        </div>
      )}

      {/* Metadata */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <p>Submitted: {new Date(review.createdAt).toLocaleString()}</p>
        {review.updatedAt !== review.createdAt && (
          <p>Updated: {new Date(review.updatedAt).toLocaleString()}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        {!review.approved ? (
          <>
            <button
              onClick={() => approveReview(review._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <CheckIcon className="h-4 w-4" />
              <span>Approve</span>
            </button>
            <button
              onClick={() => rejectReview(review._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Reject</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => toggleFeatured(review._id)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              review.featured
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <StarIcon className="h-4 w-4" />
            <span>{review.featured ? 'Remove Featured' : 'Make Featured'}</span>
          </button>
        )}

        <button
          onClick={() => deleteReview(review._id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Moderate and manage customer reviews and testimonials
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'featured'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-lg text-sm capitalize ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Reviews List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Reviews ({reviews.length})
            </h3>
          </div>
          <div className="overflow-y-auto h-full space-y-4 p-4">
            {loading ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No reviews found
              </div>
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            )}
          </div>
        </div>

        {/* Review Detail */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {selectedReview ? (
            <ReviewDetail review={selectedReview} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <UserCircleIcon className="h-12 w-12 mx-auto mb-4" />
                <p>Select a review to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
