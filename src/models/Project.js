/**
 * Project model for portfolio showcase
 * Handles project data, images, and display settings
 */
import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  demoLink: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, "Please enter a valid URL"],
  },
  githubLink: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, "Please enter a valid URL"],
  },
  tags: [
    {
      type: String,
      trim: true,
      maxlength: [50, "Tag cannot exceed 50 characters"],
    },
  ],
  featured: {
    type: Boolean,
    default: false,
  },
  showOnHome: {
    type: Boolean,
    default: true,
  },
  showOnBanner: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create indexes for better query performance
ProjectSchema.index({ title: 1 })
ProjectSchema.index({ tags: 1 })
ProjectSchema.index({ featured: 1 })
ProjectSchema.index({ showOnHome: 1 })

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
