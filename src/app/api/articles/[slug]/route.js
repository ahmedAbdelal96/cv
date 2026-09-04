/**
 * Individual article API routes
 * Handles single article operations by slug
 */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Article from '@/models/Article';

// GET /api/articles/[slug] - Get single article by slug
export async function GET(request, { params }) {
  try {
    await connectDB();

    const article = await Article.findOne({ slug: params.slug }).lean();

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[slug] - Update article (auth required)
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    // Build update object with all fields
    const updateData = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      description: body.description,
      category: body.category,
      tags: body.tags,
      readTime: body.readTime,
      image: body.image,
      featuredImage: body.featuredImage,
      published: body.published,
      featured: body.featured,
      author: body.author,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const article = await Article.findOneAndUpdate(
      { slug: params.slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update article',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/articles/[slug] - Partially update article (auth required)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const article = await Article.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update article',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[slug] - Delete article (auth required)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const article = await Article.findOneAndDelete({ slug: params.slug });

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
