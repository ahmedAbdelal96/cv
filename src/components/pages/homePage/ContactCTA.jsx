/**
 * Contact CTA component
 * Call-to-action section for contact with relevant stats
 */
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, Calendar, Code, Users, Clock, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactCTA() {
  const t = useTranslations('HomePage.ContactCTA');

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-background to-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main CTA */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-muted/50 shadow-lg mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('title')}
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg shadow-lg"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {t('buttons.getInTouch')}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg"
              >
                <a href="tel:+201234567890" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {t('buttons.callMe')}
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-foreground px-8 py-3 text-lg"
              >
                <a
                  href="https://calendly.com/ahmed-abdelal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  {t('buttons.scheduleCall')}
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              {t('stats.typicallyRespondWithin2HoursDuringBusinessDays')}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                50+
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {t('stats.projects')}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4 group-hover:bg-green-500/20 transition-colors">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                35+
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {t('stats.clients')}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                3+
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {t('stats.experience')}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                15+
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {t('stats.technologies')}
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-muted-foreground text-sm mb-4">
              {t('technologiesIWorkWith')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'React',
                'Next.js',
                'Node.js',
                'TypeScript',
                'MongoDB',
                'PostgreSQL',
                'Express',
                'NestJS',
                'Tailwind',
                'Docker',
                'AWS',
                'Git',
              ].map((tech, index) => (
                <span
                  key={tech}
                  className="px-3 py-2 bg-muted/50 text-foreground text-sm rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-muted/30"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{t('email')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{t('phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{t('available')} Mon - Fri, 9AM - 6PM EET</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
