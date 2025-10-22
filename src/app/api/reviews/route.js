/**
 * Reviews API routes
 * Handles client testimonials and reviews
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Review from "@/models/Review"

// GET /api/reviews - List reviews with optional filters
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const approved = searchParams.get("approved")
    const showOnHome = searchParams.get("showOnHome")

    // Build filter object
    const filter = {}
    if (approved === "true") filter.approved = true
    if (showOnHome === "true") filter.showOnHome = true

    const reviews = await Review.find(filter).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: reviews,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 })
  }
}

// POST /api/reviews - Create new review
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, reviewText, rating } = body

    // Validate required fields
    if (!name || !email || !reviewText || !rating) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const review = new Review({
      name,
      email,
      reviewText,
      rating,
      approved: false, // Default to false for moderation
    })

    await review.save()

    return NextResponse.json(
      {
        success: true,
        data: review,
        message: "Review submitted successfully and is pending approval",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 })
  }
}
