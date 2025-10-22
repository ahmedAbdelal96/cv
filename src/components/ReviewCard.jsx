"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export default function ReviewCard({ review }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
        <Quote className="w-6 h-6 text-teal-600 dark:text-teal-400" />
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"{review.comment}"</p>

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
          <span className="text-teal-600 dark:text-teal-400 font-semibold text-lg">{review.clientName.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{review.clientName}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {review.projectType} • {formatDate(review.createdAt)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
