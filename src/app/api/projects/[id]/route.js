/**
 * Individual project API routes
 * Handles single project operations
 */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

// GET /api/projects/[id] - Get single project
export async function GET(request, { params }) {
  try {
    await connectDB();

    const project = await Project.findById(params.id).lean();

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project (auth required)
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    // Build update object with all fields
    const updateData = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      images: body.images,
      demoLink: body.demoLink || body.demoUrl,
      githubLink: body.githubLink || body.githubUrl,
      technologies: body.technologies,
      tags: body.tags,
      category: body.category,
      status: body.status,
      clientName: body.clientName,
      projectDate: body.projectDate,
      budget: body.budget,
      featured: body.featured,
      showOnHome: body.showOnHome,
      showOnBanner: body.showOnBanner,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const project = await Project.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update project',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] - Partially update project (auth required)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const project = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update project',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project (auth required)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const project = await Project.findByIdAndDelete(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
