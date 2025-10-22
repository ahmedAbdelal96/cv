/**
 * Review model for client testimonials
 * Handles review data and approval status
 */
import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
  },
  reviewText: {
    type: String,
    required: [true, "Review text is required"],
    maxlength: [1000, "Review cannot exceed 1000 characters"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  showOnHome: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create index for approved reviews
ReviewSchema.index({ approved: 1 })
ReviewSchema.index({ showOnHome: 1 })

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema)
