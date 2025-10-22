import ProjectsHero from '@/components/pages/projectsPage/ProjectsHero';
import ProjectsGrid from '@/components/pages/projectsPage/ProjectsGrid';

export const metadata = {
  title: 'Projects - Ahmed Abdelal | Web Developer Portfolio',
  description:
    'Explore my portfolio of web development and UI design projects. From responsive websites to complex web applications.',
  keywords:
    'projects, portfolio, web development, UI design, React, Next.js, websites, applications',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ProjectsHero />
      <ProjectsGrid />
    </div>
  );
}
