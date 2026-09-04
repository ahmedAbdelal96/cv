import ProjectsHero from '@/components/pages/projectsPage/ProjectsHero';
import ProjectsGrid from '@/components/pages/projectsPage/ProjectsGrid';
import { getProjects } from '@/lib/data/projects';

export const metadata = {
  title: 'Projects - Ahmed Abdelal | Web Developer Portfolio',
  description:
    'Explore my portfolio of web development and UI design projects. From responsive websites to complex web applications.',
  keywords:
    'projects, portfolio, web development, UI design, React, Next.js, websites, applications',
};

export default async function ProjectsPage({ params }) {
  const { local } = await params;
  return (
    <div className="min-h-screen">
      <ProjectsHero />
      <ProjectsGrid projects={getProjects(local)} />
    </div>
  );
}
