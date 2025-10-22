/**
 * Education section component
 * Educational background and certifications for full-stack developer
 */
'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Code,
  BookOpen,
  Zap,
  Database,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const educationKeys = [
  'bachelor',
  'fullStack',
  'aws',
  'mongodb',
  'nodejs',
  'react',
];

export default function EducationSection() {
  const t = useTranslations('AboutPage.EducationSection');

  const education = educationKeys.map((key) => {
    // Safe translation with fallbacks
    const getSafeTranslation = (
      path,
      fallback = 'Information not available'
    ) => {
      try {
        const translation = t(path);
        // Check if it's a fallback message (contains the path)
        if (
          translation.includes('EducationSection') &&
          translation.includes(path)
        ) {
          return fallback;
        }
        return translation;
      } catch (error) {
        return fallback;
      }
    };

    return {
      key,
      degree: getSafeTranslation(
        `education.${key}.degree`,
        'Degree/Certification'
      ),
      institution: getSafeTranslation(
        `education.${key}.institution`,
        'Institution'
      ),
      period: getSafeTranslation(`education.${key}.period`, 'Date'),
      description: getSafeTranslation(
        `education.${key}.description`,
        'Description not available'
      ),
      type: getSafeTranslation(`education.${key}.type`, 'certification'),
    };
  });

  const getIcon = (type, key) => {
    if (type === 'degree') return GraduationCap;
    if (type === 'bootcamp') return Code;
    if (key === 'aws') return Zap;
    if (key === 'mongodb') return Database;
    if (key === 'nodejs' || key === 'react') return Code;
    return Award;
  };

  const getIconColor = (key) => {
    const colors = {
      bachelor: 'text-blue-500',
      fullStack: 'text-green-500',
      aws: 'text-orange-500',
      mongodb: 'text-green-600',
      nodejs: 'text-green-400',
      react: 'text-blue-400',
    };
    return colors[key] || 'text-primary';
  };

  const getBackgroundColor = (key) => {
    const colors = {
      bachelor: 'bg-blue-500/10',
      fullStack: 'bg-green-500/10',
      aws: 'bg-orange-500/10',
      mongodb: 'bg-green-600/10',
      nodejs: 'bg-green-400/10',
      react: 'bg-blue-400/10',
    };
    return colors[key] || 'bg-primary/10';
  };

  return (
    <section
      id="education"
      className="py-20 bg-gradient-to-br from-muted/20 to-background"
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
            {t('description1')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {education.map((item, index) => {
            const IconComponent = getIcon(item.type, item.key);
            const iconColor = getIconColor(item.key);
            const bgColor = getBackgroundColor(item.key);

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-card p-6 rounded-2xl shadow-sm border border-muted/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-7 w-7 ${iconColor}`} />
                    </div>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium capitalize">
                      {item.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.degree}
                    </h3>
                    <p className="text-primary font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {item.institution}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 bg-muted/30 px-3 py-2 rounded-lg inline-block">
                      {item.period}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-muted/30">
                    {getTechTags(item.key).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continuous Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-8 border border-primary/10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                {t('subtitle')}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('description2')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'TypeScript',
                  'Next.js 14',
                  'NestJS',
                  'Docker',
                  'Kubernetes',
                  'GraphQL',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to get relevant tech tags for each education item
function getTechTags(key) {
  const techMap = {
    bachelor: [
      'Algorithms',
      'Data Structures',
      'Database Systems',
      'Software Engineering',
    ],
    fullStack: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
    aws: ['Lambda', 'API Gateway', 'DynamoDB', 'CloudFormation', 'S3'],
    mongodb: ['Database Design', 'Aggregation', 'Indexing', 'Performance'],
    nodejs: ['Microservices', 'Performance', 'Architecture', 'Enterprise'],
    react: ['Hooks', 'State Management', 'Performance', 'Testing'],
  };
  return techMap[key] || [];
}
