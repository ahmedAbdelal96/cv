/**
 * Projects grid component
 * Full projects grid with filtering and search functionality for full-stack developer
 */
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Code,
  Database,
  Smartphone,
  ShoppingCart,
  Zap,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProjectCard from '@/components/pages/projectsPage/ProjectCard';
import { useTranslations } from 'next-intl';

// Mock data for demonstration (remove when using real API)
const mockProjects = [
  {
    _id: '1',
    title: 'E-commerce Platform',
    description:
      'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
    category: 'fullStack',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    image: '/api/placeholder/400/250?text=E-commerce+Platform',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
  },
  {
    _id: '2',
    title: 'Task Management API',
    description:
      'RESTful API built with Node.js, Express, and PostgreSQL. Includes authentication, CRUD operations, and real-time notifications.',
    category: 'backend',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Socket.io'],
    image: '/api/placeholder/400/250?text=Task+API',
    liveUrl: 'https://api.example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
  },
  {
    _id: '3',
    title: 'React Admin Dashboard',
    description:
      'Modern admin dashboard with React, TypeScript, and Chart.js. Features responsive design, data visualization, and user management.',
    category: 'frontend',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Chart.js',
      'React Query',
    ],
    image: '/api/placeholder/400/250?text=Admin+Dashboard',
    liveUrl: 'https://dashboard.example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
  },
  {
    _id: '4',
    title: 'Mobile Weather App',
    description:
      'Cross-platform mobile app built with React Native. Features real-time weather data, location services, and beautiful UI.',
    category: 'mobile',
    technologies: [
      'React Native',
      'TypeScript',
      'Expo',
      'Weather API',
      'Geolocation',
    ],
    image: '/api/placeholder/400/250?text=Weather+App',
    liveUrl: 'https://expo.io/example',
    githubUrl: 'https://github.com/example',
    featured: false,
  },
  {
    _id: '5',
    title: 'Microservices Architecture',
    description:
      'Scalable microservices architecture with Docker, Kubernetes, and message queues. Includes API gateway and service discovery.',
    category: 'backend',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'RabbitMQ'],
    image: '/api/placeholder/400/250?text=Microservices',
    liveUrl: 'https://microservices.example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
  },
  {
    _id: '6',
    title: 'Real-time Chat Application',
    description:
      'Real-time chat application with React, Socket.io, and MongoDB. Features multiple rooms, file sharing, and user presence.',
    category: 'fullStack',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'JWT'],
    image: '/api/placeholder/400/250?text=Chat+App',
    liveUrl: 'https://chat.example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
  },
];

const categoryIcons = {
  all: Filter,
  fullStack: Code,
  frontend: Zap,
  backend: Database,
  mobile: Smartphone,
  ecommerce: ShoppingCart,
  api: Database,
};

export default function ProjectsGrid() {
  const t = useTranslations('ProjectsPage.ProjectsGrid');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'all',
    'fullStack',
    'frontend',
    'backend',
    'mobile',
    'ecommerce',
    'api',
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // For demo purposes, using mock data
        // In production, use: const response = await fetch("/api/projects")
        setTimeout(() => {
          setProjects(mockProjects);
          setFilteredProjects(mockProjects);
          setLoading(false);
        }, 1000);

        // Uncomment for real API:
        // const response = await fetch("/api/projects")
        // const data = await response.json()
        // if (data.success) {
        //   setProjects(data.data)
        //   setFilteredProjects(data.data)
        // }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to mock data
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        (project) => project.category === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, activeCategory, searchTerm]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-48 mx-auto mb-4"></div>
              <div className="h-10 bg-muted rounded w-64 mx-auto mb-8"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Search and Results */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full md:w-auto md:flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredProjects.length === 1
                ? t('results.single', { count: filteredProjects.length })
                : t('results.multiple', { count: filteredProjects.length })}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category];
              return (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="mb-2 flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {t(`categories.${category}`)}
                </Button>
              );
            })}
          </div>

          {/* Active Filters Display */}
          {(activeCategory !== 'all' || searchTerm) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-4 mt-4"
            >
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {t(`categories.${activeCategory}`)}
                    <button onClick={() => setActiveCategory('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-500 text-sm rounded-full">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground"
              >
                {t('emptyState.reset')}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <Filter className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t('emptyState.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('emptyState.description')}
              </p>
              <Button onClick={resetFilters}>{t('emptyState.reset')}</Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
