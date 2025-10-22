/**
 * Articles API routes
 * Handles blog articles CRUD operations
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Article from "@/models/Article"

// GET /api/articles - List articles with optional filters
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    // Build filter object
    const filter = {}
    if (published === "true") filter.published = true

    const articles = await Article.find(filter).sort({ publishedDate: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: articles,
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 })
  }
}

// POST /api/articles - Create new article (auth required)
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, slug, content, excerpt, tags, published } = body

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, error: "Title, slug, and content are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug })
    if (existingArticle) {
      return NextResponse.json({ success: false, error: "Article with this slug already exists" }, { status: 400 })
    }

    const article = new Article({
      title,
      slug,
      content,
      excerpt,
      tags: tags || [],
      published: published || false,
    })

    await article.save()

    return NextResponse.json(
      {
        success: true,
        data: article,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 500 })
  }
}
