'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useRef } from 'react';
import { Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/pages/projectsPage/ProjectCard';
import { useLocale } from 'next-intl';

const ITEMS_PER_PAGE = 6;

const filterCopy = {
  en: {
    all: 'All projects',
    management: 'Business systems',
    ecommerce: 'E-commerce',
    web: 'Web platforms',
    empty: 'No projects match this filter.',
    reset: 'Show all projects',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    projectsCount: 'projects',
    page: 'Page',
    prev: 'Previous',
    next: 'Next',
  },
  ar: {
    all: 'كل المشاريع',
    management: 'أنظمة الأعمال',
    ecommerce: 'التجارة الإلكترونية',
    web: 'منصات الويب',
    empty: 'لا توجد مشاريع تطابق هذا التصنيف.',
    reset: 'عرض كل المشاريع',
    showing: 'عرض',
    to: 'إلى',
    of: 'من أصل',
    projectsCount: 'مشاريع',
    page: 'الصفحة',
    prev: 'السابق',
    next: 'التالي',
  },
  fr: {
    all: 'Tous les projets',
    management: 'Systèmes métier',
    ecommerce: 'E-commerce',
    web: 'Plateformes web',
    empty: 'Aucun projet ne correspond à ce filtre.',
    reset: 'Afficher tous les projets',
    showing: 'Affichage de',
    to: 'à',
    of: 'sur',
    projectsCount: 'projets',
    page: 'Page',
    prev: 'Précédent',
    next: 'Suivant',
  },
};

const categoryKey = (project) => {
  if (project.category === 'management') return 'management';
  if (project.category === 'ecommerce') return 'ecommerce';
  return 'web';
};

export default function ProjectsGrid({ projects = [] }) {
  const locale = useLocale();
  const copy = filterCopy[locale] || filterCopy.en;
  const isRTL = locale === 'ar';

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef(null);

  const categories = ['all', 'management', 'ecommerce', 'web'];

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'all'
        ? projects
        : projects.filter((project) => categoryKey(project) === activeCategory),
    [activeCategory, projects]
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;

  // Ensure current page is valid when category changes
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, validCurrentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startItem = filteredProjects.length === 0 ? 0 : (validCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredProjects.length);

  return (
    <section ref={gridTopRef} className="bg-background pb-20 pt-4 sm:pt-6 scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Filters and Counter Row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              {filteredProjects.length}{' '}
              {locale === 'ar' ? 'مشروع معروض' : locale === 'fr' ? 'projets affichés' : 'projects displayed'}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            aria-label={locale === 'ar' ? 'تصفية المشاريع' : 'Project filters'}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <Button
                  key={category}
                  type="button"
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className={`h-8 rounded-full text-xs font-medium transition-all ${
                    isActive ? 'shadow-xs' : 'border-border/70 hover:bg-muted'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === 'all' && <Filter className="me-1.5 h-3 w-3" />}
                  {copy[category]}
                </Button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Responsive Grid on Desktop */}
        {paginatedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {/* Prominent Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6 backdrop-blur-md shadow-md shadow-black/5 dark:shadow-black/20">
                {/* Stats Text */}
                <div className="text-sm text-muted-foreground text-center sm:text-start">
                  <span>
                    {copy.showing} <strong className="text-foreground font-semibold">{startItem}</strong> {copy.to}{' '}
                    <strong className="text-foreground font-semibold">{endItem}</strong> {copy.of}{' '}
                    <strong className="text-foreground font-semibold">{filteredProjects.length}</strong> {copy.projectsCount}
                  </span>
                  <span className="mx-2 opacity-40">|</span>
                  <span>
                    {copy.page} <strong className="text-primary font-semibold">{validCurrentPage}</strong> {copy.of}{' '}
                    <strong className="text-foreground font-semibold">{totalPages}</strong>
                  </span>
                </div>

                {/* Interactive Navigation Buttons */}
                <nav
                  aria-label="Pagination Navigation"
                  className="flex items-center gap-1.5 sm:gap-2 select-none"
                >
                  {/* Previous Page Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={validCurrentPage <= 1}
                    onClick={() => handlePageChange(validCurrentPage - 1)}
                    className="h-10 px-3.5 rounded-xl border-border/80 font-medium text-xs sm:text-sm hover:bg-muted active:scale-95 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                    <span>{copy.prev}</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === validCurrentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`h-10 min-w-10 px-3 flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
                            isActive
                              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                              : 'border border-border/60 bg-background/80 text-muted-foreground hover:text-foreground hover:bg-muted hover:border-muted-foreground/30'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={validCurrentPage >= totalPages}
                    onClick={() => handlePageChange(validCurrentPage + 1)}
                    className="h-10 px-3.5 rounded-xl border-border/80 font-medium text-xs sm:text-sm hover:bg-muted active:scale-95 disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{copy.next}</span>
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="mb-5 text-sm text-muted-foreground">{copy.empty}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleCategoryChange('all')}
            >
              {copy.reset}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
