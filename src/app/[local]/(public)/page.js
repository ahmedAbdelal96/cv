/**
 * Home page component
 * Main landing page with hero section and interactive components
 */
import HeroSection from '@/components/pages/homePage/HeroSection';
import AboutSection from '@/components/pages/homePage/AboutSection';
import SkillsSection from '@/components/pages/homePage/SkillsSection';
import PortfolioGrid from '@/components/pages/homePage/PortfolioGrid';
import ReviewsCarousel from '@/components/pages/homePage/ReviewsCarousel';
import BlogList from '@/components/pages/homePage/BlogList';
import ContactCTA from '@/components/pages/homePage/ContactCTA';

export const metadata = {
  title: 'Ahmed Abdelal - Full Stack Web Developer',
  description:
    'Professional Full Stack web developer specializing in modern web applications. View my portfolio, projects, and get in touch.',
  keywords: [
    'web developer',
    'UI designer',
    'portfolio',
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'NestJS',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'full stack developer',
    'frontend developer',
    'backend developer',
    'developer',
    'projects',
  ],
  authors: [{ name: 'Ahmed Abdelal' }],
  creator: 'Ahmed Abdelal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ahmedabdelal.com',
    title: 'Ahmed Abdelal - Full Stack Web Developer',
    description:
      'Professional Full Stack web developer specializing in modern web applications. View my portfolio, projects, and get in touch.',
    image: 'https://www.ahmedabdelal.com/og-image.jpg',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Portfolio Grid */}
      <PortfolioGrid />

      {/* Reviews Carousel */}
      <ReviewsCarousel />

      {/* Blog Preview */}
      <BlogList preview={true} />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
