/**
 * Individual article API routes
 * Handles single article operations by slug
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Article from "@/models/Article"

// GET /api/articles/[slug] - Get single article by slug
export async function GET(request, { params }) {
  try {
    await connectDB()

    const article = await Article.findOne({ slug: params.slug }).lean()

    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch article" }, { status: 500 })
  }
}

// PUT /api/articles/[slug] - Update article (auth required)
export async function PUT(request, { params }) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, content, excerpt, tags, published } = body

    const article = await Article.findOneAndUpdate(
      { slug: params.slug },
      {
        title,
        content,
        excerpt,
        tags,
        published,
      },
      { new: true, runValidators: true },
    )

    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ success: false, error: "Failed to update article" }, { status: 500 })
  }
}

// DELETE /api/articles/[slug] - Delete article (auth required)
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const article = await Article.findOneAndDelete({ slug: params.slug })

    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ success: false, error: "Failed to delete article" }, { status: 500 })
  }
}
