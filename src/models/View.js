/**
 * View model for analytics tracking
 * Handles page views and interaction tracking
 */
import mongoose from "mongoose"

const ViewSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "View type is required"],
    enum: ["home", "project", "blog", "about", "contact", "cv-download"],
  },
  id: {
    type: String,
    trim: true,
  },
  count: {
    type: Number,
    default: 1,
    min: [1, "Count must be at least 1"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create compound index for efficient queries
ViewSchema.index({ type: 1, id: 1 })

export default mongoose.models.View || mongoose.model("View", ViewSchema)
