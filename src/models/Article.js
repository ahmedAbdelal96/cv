/**
 * Article model for blog posts
 * Handles blog content with Markdown support
 */
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: Number,
      default: 5,
      min: 1,
    },
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
    image: {
      type: String,
      trim: true,
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    author: {
      name: {
        type: String,
        default: 'Ahmed Abdelal',
      },
      avatar: {
        type: String,
        default: '/user.png',
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
    featured: {
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

// Create indexes for better query performance
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ published: 1 });
ArticleSchema.index({ featured: 1 });
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ publishedDate: -1 });

export default mongoose.models.Article ||
  mongoose.model('Article', ArticleSchema);
