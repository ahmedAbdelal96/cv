import projects from '@/data/projects.json';

const imageCounts = {
  alhussan: 12,
  devSphereX: 4,
  'digital-ecoomercy': 9,
  epca: 3,
  sawiyaa: 6,
  stockFlow: 7,
};

const localized = (value, locale) => {
  if (value && typeof value === 'object') return value[locale] || value.en || value.ar || '';
  return value || '';
};

export function normalizeProject(project, locale = 'en') {
  const gallery = project.gallery?.length
    ? project.gallery
    : project.folder && imageCounts[project.folder]
      ? Array.from({ length: imageCounts[project.folder] }, (_, index) => ({
          src: `/projects/${project.folder}/${index + 1}.png`,
          order: index + 1,
        }))
      : [];

  return {
    ...project,
    title: localized(project.title, locale),
    description: localized(project.description, locale),
    content: localized(project.content, locale),
    coverImage: project.coverImage || gallery[0]?.src || '',
    liveUrl: project.liveUrl || project.demoLink || '',
    githubUrl: project.githubUrl || project.githubLink || '',
    technologies: (project.technologies?.length ? project.technologies : project.tags || []).slice(0, 8),
    gallery,
    gallerySettings: {
      autoPlay: project.gallerySettings?.autoPlay ?? true,
      intervalSeconds: project.gallerySettings?.intervalSeconds ?? 5,
      loop: project.gallerySettings?.loop ?? true,
    },
  };
}

export function getProjects(locale = 'en', options = {}) {
  const { home = false, featured = false } = options;
  return projects
    .filter((project) => project.published !== false)
    .filter((project) => !home || project.featured || project.showOnHome)
    .filter((project) => !featured || project.featured)
    .sort((a, b) => {
      const orderA = a.order ?? a.priority ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? b.priority ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.projectDate || 0) - new Date(a.projectDate || 0);
    })
    .map((project) => normalizeProject(project, locale));
}

export function getProjectBySlug(slug, locale = 'en') {
  const project = projects.find((item) => item.published !== false && item.slug === slug);
  return project ? normalizeProject(project, locale) : null;
}

export function getProjectSlugs() {
  return projects.filter((project) => project.published !== false).map(({ slug }) => slug);
}
