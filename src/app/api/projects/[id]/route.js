/**
 * Individual project API routes
 * Handles single project operations
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Project from "@/models/Project"

// GET /api/projects/[id] - Get single project
export async function GET(request, { params }) {
  try {
    await connectDB()

    const project = await Project.findById(params.id).lean()

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT /api/projects/[id] - Update project (auth required)
export async function PUT(request, { params }) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, images, demoLink, githubLink, tags, featured, showOnHome, showOnBanner } = body

    const project = await Project.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        images,
        demoLink,
        githubLink,
        tags,
        featured,
        showOnHome,
        showOnBanner,
      },
      { new: true, runValidators: true },
    )

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE /api/projects/[id] - Delete project (auth required)
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const project = await Project.findByIdAndDelete(params.id)

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
  }
}
