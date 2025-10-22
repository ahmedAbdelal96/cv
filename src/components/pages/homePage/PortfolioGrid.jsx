/**
 * Portfolio grid component
 * Displays services and featured projects in a responsive grid
 */
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProjectCard from '@/components/pages/projectsPage/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PortfolioGrid({ showAll = false }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('HomePage.PortfolioSection');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = showAll ? '/api/projects' : '/api/projects?showOnHome=true';
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setProjects(showAll ? data.data : data.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [showAll]);

  const services = [
    {
      key: 'webDevelopment',
      icon: '🚀',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'appDevelopment',
      icon: '🔗',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      key: 'database',
      icon: '🗄️',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      key: 'devops',
      icon: '⚙️',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      key: 'frontend',
      icon: '🎨',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      key: 'backend',
      icon: '⚡',
      gradient: 'from-teal-500 to-blue-500',
    },
  ];

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-primary font-medium text-sm uppercase tracking-wider mb-2"
            >
              {t('services.title')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              {t('services.heading')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
            {t('services.title')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.heading')}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-background border border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient Background Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`services.${service.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects Grid */}
        {projects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('projects.title')}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {!showAll && projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">{t('projects.viewMore')}</Link>
                </Button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t('noProjects')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('workingOnProjects')}
              {t('soon')}
            </p>
            <Button asChild>
              <Link href="/contact">{t('contact')}</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
