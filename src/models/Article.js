/**
 * Article model for blog posts
 * Handles blog content with Markdown support
 */
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Article slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens',
    ],
  },
  content: {
    type: String,
    required: [true, 'Article content is required'],
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters'],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: String,
      trim: true,
      maxlength: [50, 'Tag cannot exceed 50 characters'],
    },
  ],
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes for better query performance
// Note: slug index is automatic due to unique: true in schema
ArticleSchema.index({ published: 1 });
ArticleSchema.index({ tags: 1 });

export default mongoose.models.Article ||
  mongoose.model('Article', ArticleSchema);
