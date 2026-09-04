import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowRight,
  Layers,
  CheckCircle2,
  Tag,
  Code2,
} from 'lucide-react';
import { getProjectBySlug, getProjectSlugs, getProjects } from '@/lib/data/projects';
import ProjectGallery from '@/components/pages/projectsPage/ProjectGallery';

export const dynamicParams = false;

export function generateStaticParams() {
  return ['en', 'ar', 'fr'].flatMap((local) =>
    getProjectSlugs().map((slug) => ({ local, slug }))
  );
}

export async function generateMetadata({ params }) {
  const { local, slug } = await params;
  const project = getProjectBySlug(slug, local);
  return project
    ? { title: `${project.title} | Ahmed Abdelal`, description: project.description }
    : { title: 'Project not found' };
}

const copy = {
  en: {
    back: 'Back to projects',
    overview: 'Project Overview',
    projectInfo: 'Project Details',
    type: 'Project Type',
    status: 'Status',
    statusCompleted: 'Completed & Delivered',
    technologies: 'Technologies Used',
    domain: 'Domain & Tags',
    live: 'Visit Live Project',
    github: 'Source Code',
    nextProject: 'Next Project',
    prevProject: 'Previous Project',
    allProjects: 'All Projects',
  },
  ar: {
    back: 'العودة إلى المشاريع',
    overview: 'نظرة عامة على المشروع',
    projectInfo: 'معلومات وتفاصيل المشروع',
    type: 'نوع المشروع',
    status: 'حالة المشروع',
    statusCompleted: 'مكتمل ومسلّم',
    technologies: 'التقنيات المستخدمة',
    domain: 'المجال والتصنيف',
    live: 'زيارة المشروع ↗',
    github: 'معاينة الكود ↗',
    nextProject: 'المشروع التالي',
    prevProject: 'المشروع السابق',
    allProjects: 'جميع المشاريع',
  },
  fr: {
    back: 'Retour aux projets',
    overview: 'Présentation du projet',
    projectInfo: 'Détails du projet',
    type: 'Type de projet',
    status: 'Statut',
    statusCompleted: 'Terminé et livré',
    technologies: 'Technologies utilisées',
    domain: 'Domaine & Tags',
    live: 'Visiter le projet ↗',
    github: 'Voir le code source ↗',
    nextProject: 'Projet suivant',
    prevProject: 'Projet précédent',
    allProjects: 'Tous les projets',
  },
};

const categoryMap = {
  management: { en: 'Management & ERP Systems', ar: 'إدارة أعمال وأنظمة ERP', fr: 'Gestion d’entreprise & ERP' },
  frontend: { en: 'Web Platform & Frontend', ar: 'منصة وتطبيقات الويب', fr: 'Plateforme Web & Frontend' },
  ecommerce: { en: 'E-Commerce Platform', ar: 'متجر وتجارة إلكترونية', fr: 'Plateforme E-Commerce' },
  fullStack: { en: 'Full-Stack Solution', ar: 'حلول متكاملة (Full-Stack)', fr: 'Solution Full-Stack' },
};

export default async function ProjectDetailsPage({ params }) {
  const { local, slug } = await params;
  const project = getProjectBySlug(slug, local);
  if (!project) notFound();

  const labels = copy[local] || copy.en;
  const isRTL = local === 'ar';

  // Navigation between projects
  const allProjects = getProjects(local);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const categoryDisplay = categoryMap[project.category]?.[local] || project.category;

  // Separate technologies from tags if needed
  const tagsList = project.tags || [];
  const techList = project.technologies || [];

  return (
    <article className="min-h-screen bg-background py-8 sm:py-12 lg:py-16">
      {/* Main Wide Container */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href={`/${local}/projects`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
            <span>{labels.back}</span>
          </Link>
        </div>

        {/* Hero Section Header (Max Width for comfortable reading) */}
        <header className="mb-10 sm:mb-12 max-w-4xl lg:max-w-5xl">
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-primary">
            <Layers className="h-3.5 w-3.5" />
            <span className="capitalize">{categoryDisplay}</span>
          </div>
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground font-normal">
            {project.description}
          </p>
        </header>

        {/* Large Project Gallery (Full Width inside 1440px Container) */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <ProjectGallery project={project} />
        </section>

        {/* Project Details Grid (2-Column Layout on Desktop) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start border-t border-border/70 pt-10 sm:pt-14">
          {/* Left Column: Project Overview & In-Depth Story */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <section aria-labelledby="project-overview-heading">
              <h2
                id="project-overview-heading"
                className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                {labels.overview}
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p className="whitespace-pre-line">{project.content}</p>
              </div>
            </section>
          </div>

          {/* Right Column: Structured Project Information Card */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8 backdrop-blur-sm shadow-md shadow-black/5 dark:shadow-black/20 space-y-6">
              <h3 className="text-lg font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span>{labels.projectInfo}</span>
              </h3>

              {/* Category / Type */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {labels.type}
                </p>
                <p className="mt-1.5 text-sm sm:text-base font-semibold text-foreground">
                  {categoryDisplay}
                </p>
              </div>

              {/* Status */}
              {project.status && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {labels.status}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm sm:text-base font-medium text-foreground">
                      {labels.statusCompleted}
                    </span>
                  </div>
                </div>
              )}

              {/* Technologies Chips */}
              {techList.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {labels.technologies}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/15 transition-colors hover:bg-primary/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Domain & Classification Tags */}
              {tagsList.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {labels.domain}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tagsList.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        <Tag className="h-3 w-3 opacity-60" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Project & GitHub CTA Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="pt-3 border-t border-border/60 space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm sm:text-base font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:scale-[1.01] active:scale-95"
                    >
                      <span>{labels.live}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/80 hover:bg-accent hover:text-accent-foreground px-5 py-3.5 text-sm sm:text-base font-medium text-foreground transition-all duration-200 active:scale-95"
                    >
                      <Github className="h-4 w-4" />
                      <span>{labels.github}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Bottom Pagination & Navigation Between Projects */}
        <div className="mt-16 sm:mt-20 border-t border-border/70 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prevProject ? (
              <Link
                href={`/${local}/projects/${prevProject.slug}`}
                className="group flex flex-1 flex-col rounded-xl border border-border/60 p-4 transition-all hover:border-primary/50 hover:bg-muted/20"
              >
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                  {labels.prevProject}
                </span>
                <span className="mt-1 font-semibold text-foreground truncate">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block flex-1" />
            )}

            <Link
              href={`/${local}/projects`}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-muted/40 px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {labels.allProjects}
            </Link>

            {nextProject ? (
              <Link
                href={`/${local}/projects/${nextProject.slug}`}
                className="group flex flex-1 flex-col items-end text-end rounded-xl border border-border/60 p-4 transition-all hover:border-primary/50 hover:bg-muted/20"
              >
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {labels.nextProject}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </span>
                <span className="mt-1 font-semibold text-foreground truncate">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block flex-1" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
