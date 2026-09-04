/**
 * Project model for portfolio showcase
 * Handles project data, images, and display settings
 */
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    content: {
      type: String,
      maxlength: [10000, 'Content cannot exceed 10000 characters'],
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
      match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
    githubLink: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
    },
    technologies: [
      {
        type: String,
        trim: true,
        maxlength: [50, 'Technology name cannot exceed 50 characters'],
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, 'Tag cannot exceed 50 characters'],
      },
    ],
    category: {
      type: String,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
    clientName: {
      type: String,
      trim: true,
    },
    projectDate: {
      type: Date,
    },
    budget: {
      type: String,
      trim: true,
    },
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
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
ProjectSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

// Create indexes for better query performance
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ title: 1 });
ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ technologies: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ showOnHome: 1 });
ProjectSchema.index({ status: 1 });

export default mongoose.models.Project ||
  mongoose.model('Project', ProjectSchema);
