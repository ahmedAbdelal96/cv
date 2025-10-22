import AboutHero from '@/components/pages/aboutPage/AboutHero';
import BiographySection from '@/components/pages/aboutPage/BiographySection';
import ExperienceSection from '@/components/pages/aboutPage/ExperienceSection';
import EducationSection from '@/components/pages/aboutPage/EducationSection';
import SkillsDetailSection from '@/components/pages/aboutPage/SkillsDetailSection';
import AwardsSection from '@/components/pages/aboutPage/AwardsSection';

export const metadata = {
  title: 'About - Ahmed Abdelal | Web Developer & UI Designer',
  description:
    'Learn more about Ahmed Abdelal, a passionate web developer and UI designer with years of experience creating beautiful and functional digital experiences.',
  keywords:
    'about, biography, experience, skills, education, web developer, UI designer',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <BiographySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsDetailSection />
      <AwardsSection />
    </div>
  );
}
