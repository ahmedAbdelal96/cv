/**
 * Contact message by ID API route
 * Handles individual message operations
 */
import { NextResponse } from 'next/server';
import Message from '@/models/Message';
import connectDB from '@/lib/db';

// GET /api/contact/[id] - Get specific message by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const message = await Message.findById(id).lean();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error fetching message:', error);

    // Check if it's a MongoDB ObjectId error
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid message ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch message' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete specific message by ID (optional)
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
      data: deletedMessage,
    });
  } catch (error) {
    console.error('Error deleting message:', error);

    // Check if it's a MongoDB ObjectId error
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid message ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

// PATCH /api/contact/[id] - Update message status (mark as read, etc.)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    // Only allow certain fields to be updated
    const allowedUpdates = ['isRead', 'status', 'adminNotes'];
    const updates = {};

    Object.keys(body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Add updated timestamp
    updates.updatedAt = new Date();

    const updatedMessage = await Message.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedMessage) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully',
      data: updatedMessage,
    });
  } catch (error) {
    console.error('Error updating message:', error);

    // Check if it's a MongoDB ObjectId error
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid message ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}
