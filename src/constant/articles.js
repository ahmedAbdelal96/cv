export const mockArticle = [
  {
    _id: '1',
    title: 'Building Scalable APIs with NestJS and TypeScript',
    excerpt:
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

## Best Practices

- Use dependency injection for better testability
- Implement proper error handling
- Use validation pipes for data validation
- Implement caching strategies
- Use environment variables for configuration

## Conclusion

NestJS combined with TypeScript provides a robust foundation for building scalable and maintainable APIs.`,
    slug: 'building-scalable-apis-nestjs-typescript',
    publishedDate: '2024-01-15',
    readTime: 8,
    tags: ['nestjs', 'typescript', 'nodejs', 'api', 'backend', 'scalability'],
    category: 'backend',
    featuredImage: '/api/placeholder/800/400?text=NestJS+API',
    author: {
      name: 'Ahmed Abdelal',
      avatar: '/user.png',
    },
    featured: true,
    views: 1245,
  },

  {
    _id: '2',
    title: 'Next.js 14 Performance Optimization Guide',
    excerpt:
      'Advanced techniques to optimize your Next.js applications including server components, caching strategies, and bundle optimization.',
    content: 'Full article content here...',
    slug: 'nextjs-14-performance-optimization',
    publishedDate: '2024-01-10',
    readTime: 6,
    tags: ['nextjs', 'react', 'performance', 'optimization'],
    category: 'frontend',
    image: '/api/placeholder/400/250?text=Next.js+Performance',
    featured: true,
    views: 1023,
  },
  {
    _id: '3',
    title: 'Microservices Architecture with Node.js',
    excerpt:
      'A comprehensive guide to building microservices with Node.js and Docker containerization.',
    content: 'Full article content here...',
    slug: 'microservices-architecture-nodejs',
    publishedDate: '2024-01-05',
    readTime: 10,
    tags: ['microservices', 'nodejs', 'docker', 'architecture'],
    category: 'backend',
    image: '/api/placeholder/400/250?text=Microservices',
    featured: false,
    views: 789,
  },
];
