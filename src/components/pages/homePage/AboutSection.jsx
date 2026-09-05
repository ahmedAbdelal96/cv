/**
 * About section component
 * Brief introduction with profile image and bio
 */
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';
import { useTranslations } from 'next-intl';
import DownloadCVButton from '@/components/common/DownloadCVButton';

export default function AboutSection({ site = {} }) {
  const t = useTranslations('HomePage.AboutSection');

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <Image
                src="/user.png"
                alt={t('altText')}
                width={350}
                height={450}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-primary font-medium text-sm uppercase tracking-wider mb-2"
              >
                {t('biography')}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                {t('title')}
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                {t('description')}
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6"
            >
              <div>
                <p className="font-semibold text-foreground">{t('contactInfo.name')}:</p>
                <p className="text-muted-foreground">{site.name}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{t('contactInfo.from')}:</p>
                <p className="text-muted-foreground">{site.location}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{t('contactInfo.email')}:</p>
                <p className="text-muted-foreground">{site.email}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{t('contactInfo.phone')}:</p>
                <p className="text-muted-foreground">{site.phone}</p>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <p className="font-semibold text-foreground">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Express', 'NestJS', 'TailwindCSS'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="font-semibold text-foreground">{t('followMe')}</p>
              <SocialLinks />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact">{t('buttons.hireMe')}</Link>
              </Button>

              <DownloadCVButton className="border border-border bg-transparent text-foreground hover:bg-muted" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
