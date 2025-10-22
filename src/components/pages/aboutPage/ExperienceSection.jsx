/**
 * Experience section component
 * Professional work experience timeline for full-stack developer
 */
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, Building, Award, TrendingUp } from 'lucide-react';

const experienceKeys = ['seniorFullStack', 'fullStack', 'frontend', 'junior'];

export default function ExperienceSection() {
  const t = useTranslations('AboutPage.ExperienceSection');

  const experiences = experienceKeys.map((key) => {
    // Get achievements safely
    const achievements = [];
    for (let i = 0; i < 4; i++) {
      const achievement = t(`experiences.${key}.achievements.${i}`, {
        defaultValue: null,
      });
      // Check if the achievement exists and is not the fallback value
      if (
        achievement &&
        !achievement.includes('ExperienceSection.experiences')
      ) {
        achievements.push(achievement);
      }
    }

    return {
      key,
      title: t(`experiences.${key}.title`),
      company: t(`experiences.${key}.company`),
      period: t(`experiences.${key}.period`),
      description: t(`experiences.${key}.description`),
      achievements,
    };
  });

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-background to-muted/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('title')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey through the world of software development,
            from writing my first line of code to leading full-stack projects.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-0.5"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot with icon */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full transform md:-translate-x-4 z-10 flex items-center justify-center shadow-lg border-2 border-background">
                  {index === 0 && <TrendingUp className="h-4 w-4 text-white" />}
                  {index === 1 && <Award className="h-4 w-4 text-white" />}
                  {index === 2 && <Building className="h-4 w-4 text-white" />}
                  {index === 3 && <Calendar className="h-4 w-4 text-white" />}
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card p-6 rounded-xl shadow-sm border border-muted/50 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Building className="h-4 w-4" />
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    {exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.2 + i * 0.1,
                              }}
                              viewport={{ once: true }}
                              className="text-sm text-muted-foreground flex items-start"
                            >
                              <span className="text-primary mr-3 mt-1 flex-shrink-0">
                                ▸
                              </span>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-muted/30">
                      {getTechTags(exp.key).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { number: '4+', label: 'Years Experience' },
            { number: '50+', label: 'Projects Completed' },
            { number: '30+', label: 'Happy Clients' },
            { number: '15+', label: 'Technologies' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-muted/30 hover:border-primary/20 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to get tech tags for each experience
function getTechTags(expKey) {
  const techMap = {
    seniorFullStack: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'AWS',
      'Docker',
      'Microservices',
    ],
    fullStack: [
      'MERN Stack',
      'TypeScript',
      'REST APIs',
      'MongoDB',
      'Express',
      'CI/CD',
    ],
    frontend: [
      'React',
      'JavaScript',
      'CSS3',
      'Responsive Design',
      'Performance',
      'Webpack',
    ],
    junior: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Git'],
  };
  return techMap[expKey] || [];
}
