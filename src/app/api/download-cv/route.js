/**
 * CV download API route
 * Handles CV download tracking and file serving
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import View from "@/models/View"

// POST /api/download-cv - Track CV download and return file
export async function POST(request) {
  try {
    await connectDB()

    // Track the download event
    let view = await View.findOne({ type: "cv-download" })

    if (view) {
      view.count += 1
      await view.save()
    } else {
      view = new View({
        type: "cv-download",
        count: 1,
      })
      await view.save()
    }

    // Return the CV file URL
    const cvUrl = "/cv/Ahmed_Abdelal_CV.pdf"

    return NextResponse.json({
      success: true,
      data: {
        url: cvUrl,
        downloadCount: view.count,
      },
    })
  } catch (error) {
    console.error("Error tracking CV download:", error)
    return NextResponse.json({ success: false, error: "Failed to process download" }, { status: 500 })
  }
}

// GET /api/download-cv - Get download statistics
export async function GET() {
  try {
    await connectDB()

    const view = await View.findOne({ type: "cv-download" })
    const downloadCount = view ? view.count : 0

    return NextResponse.json({
      success: true,
      data: {
        downloadCount,
      },
    })
  } catch (error) {
    console.error("Error fetching download stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
