/**
 * Detailed skills section component
 * Comprehensive skills breakdown with categories for full-stack developer
 */
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Code, Database, Settings, Zap, Cpu, Cloud } from 'lucide-react';

const skillCategories = [
  {
    key: 'frontend',
    icon: Code,
    color: 'blue',
    skills: [
      { key: 'react', level: 95 },
      { key: 'typescript', level: 90 },
      { key: 'html', level: 95 },
      { key: 'tailwind', level: 90 },
      { key: 'state', level: 85 },
    ],
  },
  {
    key: 'backend',
    icon: Database,
    color: 'green',
    skills: [
      { key: 'node', level: 90 },
      { key: 'nest', level: 85 },
      { key: 'mongodb', level: 88 },
      { key: 'postgresql', level: 82 },
      { key: 'apis', level: 92 },
    ],
  },
  {
    key: 'tools',
    icon: Settings,
    color: 'purple',
    skills: [
      { key: 'git', level: 95 },
      { key: 'docker', level: 80 },
      { key: 'aws', level: 78 },
      { key: 'testing', level: 85 },
      { key: 'cicd', level: 82 },
    ],
  },
];

export default function SkillsDetailSection() {
  const t = useTranslations('AboutPage.SkillsDetailSection');

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        progress: 'bg-blue-500',
        border: 'border-blue-200',
      },
      green: {
        bg: 'bg-green-500/10',
        text: 'text-green-500',
        progress: 'bg-green-500',
        border: 'border-green-200',
      },
      purple: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-500',
        progress: 'bg-purple-500',
        border: 'border-purple-200',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      id="skills-detail"
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
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const colorClasses = getColorClasses(category.color);
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`bg-card p-6 rounded-2xl shadow-sm border ${colorClasses.border} hover:shadow-lg transition-all duration-300 group`}
              >
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 ${colorClasses.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`h-8 w-8 ${colorClasses.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {t(`categories.${category.key}.title`)}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground text-sm">
                          {t(`categories.${category.key}.skills.${skill.key}`)}
                        </span>
                        <span
                          className={`text-xs font-semibold ${colorClasses.text}`}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                          viewport={{ once: true }}
                          className={`h-2.5 rounded-full ${colorClasses.progress} relative`}
                        >
                          {/* Animated shine effect */}
                          <motion.div
                            animate={{ x: ['0%', '100%'] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: 'easeInOut',
                            }}
                            className="absolute inset-0 bg-white/30 rounded-full"
                          />
                        </motion.div>
                      </div>

                      {/* Skill Level Indicator */}
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-8 border border-primary/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                Additional Technologies
              </h3>
              <p className="text-muted-foreground">
                Other technologies and tools I work with regularly
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React Native', icon: '📱' },
                { name: 'GraphQL', icon: '🔗' },
                { name: 'Redis', icon: '🗄️' },
                { name: 'WebSocket', icon: '⚡' },
                { name: 'Jest', icon: '🧪' },
                { name: 'Cypress', icon: '🌐' },
                { name: 'Nginx', icon: '🔧' },
                { name: 'Linux', icon: '🐧' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-4 bg-background rounded-lg border border-muted/30 hover:border-primary/20 transition-colors"
                >
                  <span className="text-2xl mb-2">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground text-center">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
