/**
 * Views increment API route
 * Handles analytics tracking for page views
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import View from "@/models/View"

// POST /api/views/increment - Increment view count
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { type, id } = body

    // Validate required fields
    if (!type) {
      return NextResponse.json({ success: false, error: "View type is required" }, { status: 400 })
    }

    // Create filter for finding existing view record
    const filter = { type }
    if (id) filter.id = id

    // Try to find existing view record
    let view = await View.findOne(filter)

    if (view) {
      // Increment existing count
      view.count += 1
      await view.save()
    } else {
      // Create new view record
      view = new View({
        type,
        id: id || null,
        count: 1,
      })
      await view.save()
    }

    return NextResponse.json({
      success: true,
      data: {
        type: view.type,
        id: view.id,
        count: view.count,
      },
    })
  } catch (error) {
    console.error("Error incrementing view:", error)
    return NextResponse.json({ success: false, error: "Failed to increment view" }, { status: 500 })
  }
}
