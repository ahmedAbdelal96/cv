/**
 * Seed script for Projects
 * Run: node src/scripts/seedProjects.js
 */
import mongoose from 'mongoose';
import Project from '../models/Project.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI is required to seed the database');

const projects = [
  {
    title: 'E-Commerce Platform with Next.js',
    slug: 'ecommerce-platform-nextjs',
    description:
      'A full-featured e-commerce platform built with Next.js 14, featuring product management, shopping cart, payment integration, and admin dashboard.',
    content: `A comprehensive e-commerce solution built with modern technologies. Features include:
- Product catalog with filtering and search
- Shopping cart and checkout process
- Stripe payment integration
- Admin dashboard for product management
- User authentication and order tracking
- Responsive design for all devices`,
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    ],
    demoLink: 'https://ecommerce-demo.vercel.app',
    githubLink: 'https://github.com/yourusername/ecommerce-platform',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Stripe',
      'MongoDB',
    ],
    tags: ['fullstack', 'ecommerce', 'payment'],
    category: 'web',
    status: 'completed',
    clientName: 'TechStore Inc.',
    projectDate: new Date('2024-01-15'),
    budget: '$15,000',
    featured: true,
    showOnHome: true,
    showOnBanner: true,
    views: 1523,
  },
  {
    title: 'Real-time Chat Application',
    slug: 'realtime-chat-application',
    description:
      'A modern real-time chat application with WebSockets, supporting group chats, file sharing, and end-to-end encryption.',
    content: `A feature-rich chat application with real-time messaging capabilities:
- Real-time messaging using Socket.io
- Group chats and private messages
- File and image sharing
- User presence indicators
- Message read receipts
- Dark mode support
- Mobile-responsive design`,
    images: [
      'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80',
      'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80',
    ],
    demoLink: 'https://chat-app-demo.vercel.app',
    githubLink: 'https://github.com/yourusername/chat-app',
    technologies: [
      'React',
      'Node.js',
      'Socket.io',
      'Express',
      'MongoDB',
      'Redis',
    ],
    tags: ['realtime', 'websockets', 'messaging'],
    category: 'web',
    status: 'completed',
    projectDate: new Date('2023-11-20'),
    featured: true,
    showOnHome: true,
    showOnBanner: false,
    views: 987,
  },
  {
    title: 'Task Management Dashboard',
    slug: 'task-management-dashboard',
    description:
      'An intuitive task management system with drag-and-drop functionality, team collaboration, and progress tracking.',
    content: `A comprehensive task management solution for teams:
- Drag-and-drop task boards (Kanban style)
- Team collaboration features
- Project and milestone tracking
- Time tracking and reporting
- Calendar integration
- Notification system
- Role-based permissions`,
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    ],
    demoLink: 'https://taskmanager-demo.vercel.app',
    githubLink: 'https://github.com/yourusername/task-manager',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Tailwind CSS',
    ],
    tags: ['productivity', 'collaboration', 'dashboard'],
    category: 'web',
    status: 'completed',
    clientName: 'ProductivityPro',
    projectDate: new Date('2023-09-10'),
    budget: '$12,000',
    featured: true,
    showOnHome: true,
    showOnBanner: false,
    views: 756,
  },
  {
    title: 'Portfolio Website Generator',
    slug: 'portfolio-website-generator',
    description:
      'A SaaS platform that allows users to create beautiful portfolio websites with customizable templates and themes.',
    content: `A powerful portfolio website builder:
- Multiple pre-designed templates
- Drag-and-drop page builder
- Custom domain support
- SEO optimization tools
- Analytics integration
- Blog functionality
- Contact form builder`,
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80',
    ],
    demoLink: 'https://portfolio-builder.vercel.app',
    githubLink: 'https://github.com/yourusername/portfolio-builder',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'Tailwind CSS',
    ],
    tags: ['saas', 'portfolio', 'cms'],
    category: 'web',
    status: 'in-progress',
    projectDate: new Date('2024-02-01'),
    featured: false,
    showOnHome: true,
    showOnBanner: false,
    views: 423,
  },
  {
    title: 'AI-Powered Content Generator',
    slug: 'ai-content-generator',
    description:
      'An AI-powered tool for generating blog posts, social media content, and marketing copy using GPT-4.',
    content: `An intelligent content creation platform:
- GPT-4 integration for content generation
- Multiple content templates
- SEO optimization suggestions
- Plagiarism checker
- Content scheduling
- Analytics and insights
- Team collaboration`,
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      'https://images.unsplash.com/photo-1676277791608-ac52e80b8bd8?w=800&q=80',
    ],
    demoLink: 'https://ai-content-gen.vercel.app',
    githubLink: 'https://github.com/yourusername/ai-content-generator',
    technologies: [
      'Next.js',
      'OpenAI API',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
    ],
    tags: ['ai', 'content', 'automation'],
    category: 'web',
    status: 'in-progress',
    projectDate: new Date('2024-03-01'),
    featured: false,
    showOnHome: true,
    showOnBanner: false,
    views: 312,
  },
  {
    title: 'Mobile Fitness Tracking App',
    slug: 'mobile-fitness-app',
    description:
      'A cross-platform mobile app for tracking workouts, nutrition, and fitness goals with social features.',
    content: `A comprehensive fitness tracking solution:
- Workout logging and tracking
- Nutrition and calorie tracking
- Progress photos and measurements
- Social features and challenges
- Personal trainer integration
- Wearable device sync
- Custom workout plans`,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80',
    ],
    demoLink: 'https://fitness-app-demo.app',
    githubLink: 'https://github.com/yourusername/fitness-app',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux'],
    tags: ['mobile', 'fitness', 'health'],
    category: 'mobile',
    status: 'planned',
    projectDate: new Date('2024-06-01'),
    featured: false,
    showOnHome: false,
    showOnBanner: false,
    views: 156,
  },
];

async function seedProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    // Display inserted projects
    insertedProjects.forEach((project) => {
      console.log(`   - ${project.title} (${project.slug})`);
    });

    console.log('\n✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the seed function
seedProjects();
