/**
 * Articles API routes
 * Handles blog articles CRUD operations
 */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Article from '@/models/Article';

// GET /api/articles - List articles with optional filters
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // Build filter object
    const filter = {};

    // Only show published articles by default on public pages
    if (published !== 'false') {
      filter.published = true;
    }

    if (category) {
      filter.category = category.toLowerCase();
    }

    if (tag) {
      filter.tags = { $in: [new RegExp(tag, 'i')] };
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    // Search in title, excerpt, description, and content
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const articles = await Article.find(filter)
      .sort({ publishedDate: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Create new article (auth required)
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, slug, and content are required',
        },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug: body.slug });
    if (existingArticle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article with this slug already exists',
        },
        { status: 400 }
      );
    }

    const article = new Article({
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || '',
      description: body.description || '',
      category: body.category || '',
      tags: body.tags || [],
      readTime: body.readTime || 5,
      image: body.image || '',
      featuredImage: body.featuredImage || '',
      published: body.published || false,
      featured: body.featured || false,
      author: body.author || {
        name: 'Ahmed Abdelal',
        avatar: '/user.png',
      },
    });

    await article.save();

    return NextResponse.json(
      {
        success: true,
        data: article,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create article',
      },
      { status: 500 }
    );
  }
}
