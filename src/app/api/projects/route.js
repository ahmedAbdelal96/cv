/**
 * Projects API routes
 * Handles CRUD operations for portfolio projects
 */
import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Project from "@/models/Project"

// GET /api/projects - List projects with optional filters
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const showOnHome = searchParams.get("showOnHome")
    const featured = searchParams.get("featured")
    const showOnBanner = searchParams.get("showOnBanner")

    // Build filter object
    const filter = {}
    if (showOnHome === "true") filter.showOnHome = true
    if (featured === "true") filter.featured = true
    if (showOnBanner === "true") filter.showOnBanner = true

    const projects = await Project.find(filter).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST /api/projects - Create new project (auth required)
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, images, demoLink, githubLink, tags, featured, showOnHome, showOnBanner } = body

    // Validate required fields
    if (!title || !description || !images || images.length === 0) {
      return NextResponse.json(
        { success: false, error: "Title, description, and at least one image are required" },
        { status: 400 },
      )
    }

    const project = new Project({
      title,
      description,
      images,
      demoLink,
      githubLink,
      tags: tags || [],
      featured: featured || false,
      showOnHome: showOnHome !== false,
      showOnBanner: showOnBanner || false,
    })

    await project.save()

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
