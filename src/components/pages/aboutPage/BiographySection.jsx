/**
 * Biography section component
 * Detailed biography and personal information for full-stack developer
 */
'use client';

import { motion } from 'framer-motion';
import SocialLinks from '@/components/SocialLinks';
import DownloadCVButton from '@/components/common/DownloadCVButton';
import { useTranslations } from 'next-intl';
import {
  Code,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
} from 'lucide-react';

export default function BiographySection({ site = {} }) {
  const t = useTranslations('AboutPage.BiographySection');

  const personalInfo = [
    {
      label: t('personalInfo.fullName'),
      value: site.name || 'Ahmed Abdelal',
      icon: User,
    },
    {
      label: t('personalInfo.dateOfBirth'),
      value: 'January 15, 1998',
      icon: Calendar,
    },
    {
      label: t('personalInfo.nationality'),
      value: 'Egyptian',
      icon: Globe,
    },
    {
      label: t('personalInfo.location'),
      value: site.location || 'Cairo, Egypt',
      icon: MapPin,
    },
    {
      label: t('personalInfo.email'),
      value: site.email || '',
      icon: Mail,
    },
    {
      label: t('personalInfo.phone'),
      value: site.phoneInternational || site.phone || '',
      icon: Phone,
    },
    {
      label: t('personalInfo.languages'),
      value: 'Arabic (Native), English (Fluent)',
      icon: Globe,
    },
    {
      label: t('personalInfo.freelance'),
      value: t('connect.available'),
      icon: Code,
    },
    {
      label: t('personalInfo.education'),
      value: 'B.Sc. Computer Science',
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Biography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-8"
              >
                {t('story.title')}
              </motion.h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {[1, 2, 3, 4].map((paragraphNum) => (
                  <motion.p
                    key={paragraphNum}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + paragraphNum * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="text-lg"
                  >
                    {t(`story.paragraphs.p${paragraphNum}`)}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Tech Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-muted/30 rounded-2xl p-6 border border-muted/50"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Development Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code that scales. My
                focus is on creating solutions that are not just working today,
                but are built to evolve with your business needs. Performance,
                security, and user experience are always at the forefront of my
                development process.
              </p>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t('connect.title')}
              </h3>
              <div className="space-y-4">
                <SocialLinks className="mb-4" social={site.social} />
                <DownloadCVButton />
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-8"
            >
              {t('personalInfo.title')}
            </motion.h2>

            <div className="space-y-4">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group border border-muted/30"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-foreground block mb-1">
                      {info.label}
                    </span>
                    <span className="text-muted-foreground">{info.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-6 border border-primary/10"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Core Expertise
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Full-Stack Development',
                  'RESTful APIs',
                  'Database Design',
                  'Cloud Deployment',
                  'Performance Optimization',
                  'Code Architecture',
                  'Team Collaboration',
                  'Agile Methodology',
                ].map((skill, index) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
