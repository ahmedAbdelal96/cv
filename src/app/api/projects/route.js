/**
 * Projects API routes
 * Handles CRUD operations for portfolio projects
 */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

// GET /api/projects - List projects with optional filters
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const showOnHome = searchParams.get('showOnHome');
    const featured = searchParams.get('featured');
    const showOnBanner = searchParams.get('showOnBanner');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build filter object
    const filter = {};
    if (showOnHome === 'true') filter.showOnHome = true;
    if (featured === 'true') filter.featured = true;
    if (showOnBanner === 'true') filter.showOnBanner = true;
    if (category) filter.category = category.toLowerCase();
    if (status) filter.status = status;

    // Search in title, description, and technologies
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project (auth required)
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.images ||
      body.images.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, description, and at least one image are required',
        },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    let slug = body.slug;
    if (!slug) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const project = new Project({
      title: body.title,
      slug,
      description: body.description,
      content: body.content || '',
      images: body.images,
      demoLink: body.demoLink || body.demoUrl || '',
      githubLink: body.githubLink || body.githubUrl || '',
      technologies: body.technologies || [],
      tags: body.tags || [],
      category: body.category || '',
      status: body.status || 'completed',
      clientName: body.clientName || '',
      projectDate: body.projectDate || null,
      budget: body.budget || '',
      featured: body.featured || false,
      showOnHome: body.showOnHome !== false,
      showOnBanner: body.showOnBanner || false,
    });

    await project.save();

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create project',
      },
      { status: 500 }
    );
  }
}
