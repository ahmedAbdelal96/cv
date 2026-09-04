'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';

const categoryLabels = {
  management: { en: 'Management', ar: 'إدارة وأنظمة', fr: 'Gestion' },
  frontend: { en: 'Web Platform', ar: 'منصة ويب', fr: 'Plateforme Web' },
  ecommerce: { en: 'E-Commerce', ar: 'متجر إلكتروني', fr: 'E-Commerce' },
  fullStack: { en: 'Full-Stack', ar: 'حل متكامل', fr: 'Full-Stack' },
};

export default function ProjectCard({ project }) {
  const locale = useLocale();
  const copy = {
    en: { featured: 'Featured', caseStudy: 'Case study', live: 'Live', code: 'Code' },
    ar: { featured: 'مميز', caseStudy: 'دراسة الحالة', live: 'مباشر', code: 'كود' },
    fr: { featured: 'Sélectionné', caseStudy: 'Étude de cas', live: 'En ligne', code: 'Code' },
  }[locale] || {};

  const projectUrl = `/${locale}/projects/${project.slug}`;
  const categoryName = categoryLabels[project.category]?.[locale] || project.category;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col h-full bg-card/70 border border-border/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300"
    >
      {/* Cover Image Banner */}
      <Link
        href={projectUrl}
        className="relative block aspect-[16/10] overflow-hidden bg-muted/40"
        aria-label={`${copy.caseStudy}: ${project.title}`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            {copy.caseStudy}
          </div>
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {project.featured ? (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/90 text-white px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md shadow-xs">
              <Star className="h-3 w-3 fill-current" />
              <span>{copy.featured}</span>
            </span>
          ) : (
            <span />
          )}

          <span className="rounded-lg bg-black/65 text-white border border-white/10 px-2.5 py-0.5 text-[11px] font-medium capitalize backdrop-blur-md shadow-xs">
            {categoryName}
          </span>
        </div>
      </Link>

      {/* Card Body Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <Link href={projectUrl} className="block group/title">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-1 group-hover/title:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="mt-1.5 mb-3 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies / Tags Chips */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/10 text-[11px] rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-md font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="pt-2 border-t border-border/50 flex items-center gap-2 mt-auto">
          <Button asChild size="sm" className="flex-1 h-8 text-xs font-semibold rounded-lg shadow-xs">
            <Link href={projectUrl} className="flex items-center justify-center gap-1">
              <span>{copy.caseStudy}</span>
              <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
            </Link>
          </Button>

          {project.liveUrl && (
            <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg shrink-0">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.live}: ${project.title}`}
                title={copy.live}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.code}: ${project.title}`}
                title={copy.code}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
