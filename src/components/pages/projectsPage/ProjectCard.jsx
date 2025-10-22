// components/ProjectCard.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProjectCard({ project }) {
  const t = useTranslations('ProjectsPage.ProjectsGrid');

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-card border border-muted/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <Image
          src={project.image || '/api/placeholder/400/250?text=Project'}
          alt={project.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
            {t(`categories.${project.category}`)}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <Button asChild size="sm" className="flex-1">
              <Link
                href={project.liveUrl}
                target="_blank"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.githubUrl}
                target="_blank"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
