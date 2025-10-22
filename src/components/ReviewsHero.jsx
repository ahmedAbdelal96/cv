"use client"

import { motion } from "framer-motion"
import { Star, Users, Award } from "lucide-react"

export default function ReviewsHero() {
  const stats = [
    { icon: Star, label: "Average Rating", value: "4.9/5" },
    { icon: Users, label: "Happy Clients", value: "50+" },
    { icon: Award, label: "Projects Completed", value: "100+" },
  ]

  return (
    <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Reviews</h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-teal-200" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-teal-200">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
