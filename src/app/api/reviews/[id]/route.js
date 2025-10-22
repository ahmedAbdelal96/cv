/**
 * Individual review API routes
 * Handles single review operations for admin management
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Review from "@/models/Review"

// PUT /api/reviews/[id] - Update review approval status (auth required)
export async function PUT(request, { params }) {
  try {
    await connectDB()

    const body = await request.json()
    const { approved, showOnHome } = body

    const review = await Review.findByIdAndUpdate(
      params.id,
      {
        approved,
        showOnHome,
      },
      { new: true, runValidators: true },
    )

    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: review,
    })
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ success: false, error: "Failed to update review" }, { status: 500 })
  }
}

// DELETE /api/reviews/[id] - Delete review (auth required)
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const review = await Review.findByIdAndDelete(params.id)

    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting review:", error)
    return NextResponse.json({ success: false, error: "Failed to delete review" }, { status: 500 })
  }
}
