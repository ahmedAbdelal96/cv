import bcrypt from "bcrypt"
import connectDB from "../lib/db.js"
import User from "../models/User.js"
import Project from "../models/Project.js"
import Review from "../models/Review.js"
import Article from "../models/Article.js"
import View from "../models/View.js"

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await Project.deleteMany({})
    await Review.deleteMany({})
    await Article.deleteMany({})
    await View.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword || !process.env.ADMIN_EMAIL) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the database")
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    const adminUser = new User({
      name: "Admin User",
      email: process.env.ADMIN_EMAIL,
      passwordHash: hashedPassword,
      role: "admin",
    })
    await adminUser.save()
    console.log("👤 Created admin user from environment credentials")

    // Create sample projects
    const projects = [
      {
        title: "E-commerce Platform",
        description:
          "A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard. Includes shopping cart, order management, and inventory tracking.",
        images: ["/uploads/project1-1.jpg", "/uploads/project1-2.jpg"],
        demoLink: "https://demo-ecommerce.vercel.app",
        githubLink: "https://github.com/username/ecommerce-platform",
        tags: ["Next.js", "React", "MongoDB", "Stripe", "Tailwind CSS"],
        featured: true,
        showOnHome: true,
        showOnBanner: true,
        views: 125,
      },
      {
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies.",
        images: ["/uploads/project2-1.jpg", "/uploads/project2-2.jpg"],
        demoLink: "https://task-manager-demo.vercel.app",
        githubLink: "https://github.com/username/task-manager",
        tags: ["React", "Node.js", "Socket.io", "PostgreSQL", "Material-UI"],
        featured: true,
        showOnHome: true,
        showOnBanner: false,
        views: 89,
      },
      {
        title: "Weather Dashboard",
        description:
          "A responsive weather dashboard that displays current weather conditions, forecasts, and weather maps. Features location-based weather data and interactive charts.",
        images: ["/uploads/project3-1.jpg"],
        demoLink: "https://weather-dashboard-demo.vercel.app",
        githubLink: "https://github.com/username/weather-dashboard",
        tags: ["JavaScript", "Chart.js", "OpenWeather API", "CSS3"],
        featured: false,
        showOnHome: true,
        showOnBanner: false,
        views: 67,
      },
    ]

    for (const projectData of projects) {
      const project = new Project(projectData)
      await project.save()
    }
    console.log("📁 Created sample projects")

    // Create sample reviews
    const reviews = [
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        reviewText:
          "Excellent work! The website exceeded our expectations. Professional, responsive, and delivered on time. Highly recommended for any web development project.",
        rating: 5,
        approved: true,
        showOnHome: true,
      },
      {
        name: "Mike Chen",
        email: "mike@example.com",
        reviewText:
          "Great developer to work with. Very communicative and delivered exactly what we needed. The code quality is top-notch and well-documented.",
        rating: 5,
        approved: false,
        showOnHome: false,
      },
    ]

    for (const reviewData of reviews) {
      const review = new Review(reviewData)
      await review.save()
    }
    console.log("⭐ Created sample reviews")

    // Create sample articles
    const articles = [
      {
        title: "Getting Started with Next.js 14",
        slug: "getting-started-nextjs-14",
        content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements that make building React applications even better. In this article, we'll explore the key features and how to get started.

## What's New in Next.js 14

- **Turbopack**: Faster local development with Rust-based bundler
- **Server Actions**: Simplified server-side mutations
- **Partial Prerendering**: Better performance with selective rendering

## Installation

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features

### App Router
The App Router provides a new way to structure your Next.js applications with improved performance and developer experience.

### Server Components
Server Components allow you to render components on the server, reducing client-side JavaScript and improving performance.

## Conclusion

Next.js 14 continues to push the boundaries of what's possible with React applications. The new features make it easier than ever to build fast, scalable web applications.`,
        excerpt:
          "Explore the exciting new features in Next.js 14 and learn how to get started with the latest version of this powerful React framework.",
        tags: ["Next.js", "React", "Web Development", "JavaScript"],
        published: true,
      },
      {
        title: "Building Responsive Layouts with Tailwind CSS",
        slug: "responsive-layouts-tailwind-css",
        content: `# Building Responsive Layouts with Tailwind CSS

Tailwind CSS makes it incredibly easy to build responsive layouts that work across all device sizes. Let's explore the best practices and techniques.

## Responsive Design Principles

- Mobile-first approach
- Flexible grid systems
- Scalable typography
- Optimized images

## Tailwind's Responsive System

Tailwind uses a mobile-first breakpoint system:

\`\`\`css
/* Mobile first */
.container {
  @apply px-4;
}

/* Tablet and up */
@screen md {
  .container {
    @apply px-8;
  }
}

/* Desktop and up */
@screen lg {
  .container {
    @apply px-12;
  }
}
\`\`\`

## Best Practices

1. Start with mobile design
2. Use responsive utilities
3. Test across devices
4. Optimize for performance

Building responsive layouts has never been easier with Tailwind CSS!`,
        excerpt:
          "Learn how to create beautiful, responsive layouts using Tailwind CSS utilities and best practices for modern web design.",
        tags: ["Tailwind CSS", "CSS", "Responsive Design", "Web Development"],
        published: true,
      },
      {
        title: "Advanced React Patterns",
        slug: "advanced-react-patterns",
        content: `# Advanced React Patterns

As React applications grow in complexity, it's important to use advanced patterns that promote code reusability and maintainability.

## Compound Components

Compound components allow you to create flexible and reusable component APIs.

## Render Props

The render prop pattern provides a way to share code between components using a prop whose value is a function.

## Higher-Order Components

HOCs are a pattern for reusing component logic across multiple components.

This article is still being written...`,
        excerpt:
          "Explore advanced React patterns that will help you build more maintainable and scalable applications.",
        tags: ["React", "JavaScript", "Design Patterns", "Frontend"],
        published: false,
      },
    ]

    for (const articleData of articles) {
      const article = new Article(articleData)
      await article.save()
    }
    console.log("📝 Created sample articles")

    // Create sample view counts
    const views = [
      { type: "home", count: 1250 },
      { type: "cv-download", count: 45 },
      { type: "project", id: "675a1b2c3d4e5f6789012345", count: 125 },
      { type: "blog", id: "getting-started-nextjs-14", count: 89 },
    ]

    for (const viewData of views) {
      const view = new View(viewData)
      await view.save()
    }
    console.log("📊 Created sample view counts")

    console.log("✅ Database seeding completed successfully!")
    console.log("\n📋 Summary:")
    console.log("- Admin user created from environment credentials")
    console.log("- 3 sample projects created")
    console.log("- 2 sample reviews created (1 approved)")
    console.log("- 3 sample articles created (2 published)")
    console.log("- Sample analytics data created")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seeding function
seedDatabase()
