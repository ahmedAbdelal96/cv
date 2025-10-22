/**
 * Skills section component
 * Displays technical skills with animated progress bars
 */
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const skills = [
  { name: 'react', level: 95, color: 'bg-blue-500' },
  { name: 'node', level: 90, color: 'bg-green-500' },
  { name: 'typescript', level: 88, color: 'bg-blue-600' },
  { name: 'mongodb', level: 85, color: 'bg-green-600' },
  { name: 'postgresql', level: 82, color: 'bg-blue-700' },
  { name: 'nest', level: 80, color: 'bg-red-500' },
  { name: 'tailwind', level: 92, color: 'bg-cyan-500' },
  { name: 'git', level: 90, color: 'bg-orange-500' },
  { name: 'docker', level: 75, color: 'bg-blue-500' },
  { name: 'aws', level: 70, color: 'bg-orange-600' },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('HomePage.SkillsSection');

  // Group skills by category for better organization
  const skillCategories = [
    {
      title: t('skills.frontend'),
      skills: skills.filter((skill) =>
        ['react', 'typescript', 'tailwind'].includes(skill.name)
      ),
    },
    {
      title: t('skills.backend'),
      skills: skills.filter((skill) => ['node', 'nest'].includes(skill.name)),
    },
    {
      title: t('skills.database'),
      skills: skills.filter((skill) =>
        ['mongodb', 'postgresql'].includes(skill.name)
      ),
    },
    {
      title: t('skills.devops'),
      skills: skills.filter((skill) =>
        ['git', 'docker', 'aws'].includes(skill.name)
      ),
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="/developer-workspace.jpg"
              alt={t('altText')}
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Right - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsVisible(true)}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-primary font-medium text-sm uppercase tracking-wider mb-2"
              >
                {t('title')}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                {t('heading')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                {t('description')}
              </motion.p>
            </div>

            {/* Skills List by Categories */}
            <div className="space-y-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + categoryIndex * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.7 + categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">
                            {t(`skills.${skill.name}`)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1.5,
                              delay:
                                0.8 + categoryIndex * 0.1 + skillIndex * 0.1,
                              ease: 'easeOut',
                            }}
                            viewport={{ once: true }}
                            className={`h-2.5 rounded-full ${skill.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
