/**
 * Seed script for Articles
 * Run: node src/scripts/seedArticles.js
 */
import mongoose from 'mongoose';
import Article from '../models/Article.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI is required to seed the database');

const articles = [
  {
    title: 'Building Scalable APIs with NestJS and TypeScript',
    slug: 'building-scalable-apis-nestjs-typescript',
    excerpt:
      'Learn how to create robust and scalable REST APIs using NestJS framework with TypeScript, dependency injection, and modern architecture patterns.',
    description:
      'Learn how to create robust and scalable REST APIs using NestJS framework with TypeScript, dependency injection, and modern architecture patterns.',
    content: `# Building Scalable APIs with NestJS and TypeScript

In this comprehensive guide, we'll explore how to build enterprise-grade APIs using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Getting Started

First, let's set up our NestJS project:

\`\`\`bash
npm install -g @nestjs/cli
nest new my-api-project
cd my-api-project
\`\`\`

## Core Concepts

NestJS provides a modular architecture that helps in building scalable applications:

\`\`\`typescript
import { Module, Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
\`\`\`

## Dependency Injection

One of the most powerful features of NestJS is its built-in dependency injection system:

\`\`\`typescript
@Injectable()
export class UsersService {
  private readonly users = [];

  findAll() {
    return this.users;
  }
}
\`\`\`

## Best Practices

- Use dependency injection for better testability
- Implement proper error handling
- Use validation pipes for data validation
- Implement caching strategies
- Use environment variables for configuration
- Follow SOLID principles
- Implement proper logging
- Use DTOs for data validation

## Error Handling

Implement global exception filters:

\`\`\`typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Handle errors
  }
}
\`\`\`

## Conclusion

NestJS combined with TypeScript provides a robust foundation for building scalable and maintainable APIs. The framework's modular architecture and built-in features make it an excellent choice for enterprise applications.`,
    publishedDate: new Date('2024-01-15'),
    readTime: 8,
    tags: ['nestjs', 'typescript', 'nodejs', 'api', 'backend', 'scalability'],
    category: 'backend',
    image: '/api/placeholder/400/250?text=NestJS+API',
    featuredImage: '/api/placeholder/800/400?text=NestJS+API',
    author: {
      name: 'Ahmed Abdelal',
      avatar: '/user.png',
    },
    published: true,
    featured: true,
    views: 1245,
  },
  {
    title: 'Next.js 14 Performance Optimization Guide',
    slug: 'nextjs-14-performance-optimization',
    excerpt:
      'Advanced techniques to optimize your Next.js applications including server components, caching strategies, and bundle optimization.',
    description:
      'Advanced techniques to optimize your Next.js applications including server components, caching strategies, and bundle optimization.',
    content: `# Next.js 14 Performance Optimization Guide

Learn how to maximize the performance of your Next.js 14 applications with these advanced optimization techniques.

## Server Components

Next.js 14 introduces powerful server components:

\`\`\`jsx
// app/page.js
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
\`\`\`

## Caching Strategies

Implement effective caching:

\`\`\`javascript
export const revalidate = 3600; // Revalidate every hour
\`\`\`

## Image Optimization

Use Next.js Image component:

\`\`\`jsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  width={500}
  height={300}
  alt="Photo"
  priority
/>
\`\`\`

## Bundle Optimization

- Use dynamic imports for code splitting
- Implement lazy loading
- Optimize third-party scripts
- Minimize CSS and JavaScript

## Best Practices

- Use Server Components by default
- Implement proper caching strategies
- Optimize images and fonts
- Minimize client-side JavaScript
- Use streaming and suspense

## Conclusion

Following these optimization techniques will significantly improve your Next.js application's performance and user experience.`,
    publishedDate: new Date('2024-01-10'),
    readTime: 6,
    tags: ['nextjs', 'react', 'performance', 'optimization'],
    category: 'frontend',
    image: '/api/placeholder/400/250?text=Next.js+Performance',
    featuredImage: '/api/placeholder/800/400?text=Next.js+Performance',
    author: {
      name: 'Ahmed Abdelal',
      avatar: '/user.png',
    },
    published: true,
    featured: true,
    views: 1023,
  },
  {
    title: 'Microservices Architecture with Node.js',
    slug: 'microservices-architecture-nodejs',
    excerpt:
      'A comprehensive guide to building microservices with Node.js and Docker containerization.',
    description:
      'A comprehensive guide to building microservices with Node.js and Docker containerization.',
    content: `# Microservices Architecture with Node.js

Learn how to design and implement a microservices architecture using Node.js and modern tools.

## What are Microservices?

Microservices are an architectural approach where applications are built as a collection of small, independent services.

## Key Concepts

- Service independence
- Decentralized data management
- Infrastructure automation
- Design for failure

## Implementation

\`\`\`javascript
// service/users/index.js
const express = require('express');
const app = express();

app.get('/api/users', async (req, res) => {
  // Handle users
});

app.listen(3001);
\`\`\`

## Docker Containerization

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
\`\`\`

## Best Practices

- Keep services small and focused
- Use API gateways
- Implement service discovery
- Use message queues for async communication
- Implement proper monitoring and logging

## Conclusion

Microservices architecture provides scalability and flexibility but requires careful planning and implementation.`,
    publishedDate: new Date('2024-01-05'),
    readTime: 10,
    tags: ['microservices', 'nodejs', 'docker', 'architecture'],
    category: 'backend',
    image: '/api/placeholder/400/250?text=Microservices',
    featuredImage: '/api/placeholder/800/400?text=Microservices',
    author: {
      name: 'Ahmed Abdelal',
      avatar: '/user.png',
    },
    published: true,
    featured: false,
    views: 789,
  },
];

async function seedArticles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing articles
    await Article.deleteMany({});
    console.log('🗑️  Cleared existing articles');

    // Insert new articles
    const insertedArticles = await Article.insertMany(articles);
    console.log(`✅ Inserted ${insertedArticles.length} articles`);

    // Display inserted articles
    insertedArticles.forEach((article) => {
      console.log(`   - ${article.title} (${article.slug})`);
    });

    console.log('\n✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the seed function
seedArticles();
