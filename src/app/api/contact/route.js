/**
 * Contact form API route
 * Handles contact form submissions, email notifications, and message management
 */
import { NextResponse } from 'next/server';
import Message from '@/models/Message';
import connectDB from '@/lib/db';
import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password
    },
  });
};

// Function to send notification email
const sendNotificationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER, // Admin email to receive notifications
      subject: `New Contact Form Submission: ${contactData.subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${contactData.subject || 'No subject'}</p>
            ${contactData.budget ? `<p><strong>Budget:</strong> ${contactData.budget}</p>` : ''}
            ${contactData.timeLine ? `<p><strong>Timeline:</strong> ${contactData.timeLine}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #007bff; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Received:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw error to prevent contact form submission failure
  }
};

// GET /api/contact - Get all messages
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalMessages = await Message.countDocuments();

    // Get messages with pagination, sorted by newest first
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalMessages / limit);

    return NextResponse.json({
      success: true,
      data: {
        messages,
        pagination: {
          currentPage: page,
          totalPages,
          totalMessages,
          limit,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Handle contact form submission
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, phone, message, budget, timeLine } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Log contact form submission (in production, you might want to save to database or send email)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Save to database
    const contactEntry = new Message({
      name,
      email,
      message,
      subject,
      phone,
      budget,
      timeLine,
    });
    await contactEntry.save();

    // Send email notification to admin
    await sendNotificationEmail({
      name,
      email,
      message,
      subject,
      phone,
      budget,
      timeLine,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
