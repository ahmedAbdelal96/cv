/**
 * Awards section component
 * Recognition and achievements for full-stack developer
 */
'use client';

import { motion } from 'framer-motion';
import {
  Trophy,
  Star,
  Award,
  Github,
  Zap,
  Users,
  Code,
  Rocket,
  Heart,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const awardKeys = [
  'openSource',
  'performance',
  'fullStack',
  'innovation',
  'codeQuality',
  'mentorship',
];

export default function AwardsSection() {
  const t = useTranslations('AboutPage.AwardsSection');

  const awards = awardKeys.map((key) => ({
    key,
    title: t(`awards.${key}.title`),
    organization: t(`awards.${key}.organization`),
    year: t(`awards.${key}.year`),
    description: t(`awards.${key}.description`),
    icon: getAwardIcon(key),
  }));

  function getAwardIcon(key) {
    const icons = {
      openSource: Github,
      performance: Zap,
      fullStack: Code,
      innovation: Rocket,
      codeQuality: Award,
      mentorship: Users,
    };
    return icons[key] || Trophy;
  }

  function getAwardColor(key) {
    const colors = {
      openSource: 'from-purple-500 to-purple-600',
      performance: 'from-yellow-500 to-orange-500',
      fullStack: 'from-blue-500 to-cyan-500',
      innovation: 'from-green-500 to-emerald-500',
      codeQuality: 'from-indigo-500 to-blue-500',
      mentorship: 'from-pink-500 to-rose-500',
    };
    return colors[key] || 'from-primary to-primary/80';
  }

  return (
    <section
      id="awards"
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
            Recognition for technical excellence, innovation, and contributions
            to the developer community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {awards.map((award, index) => {
            const Icon = award.icon;
            const gradient = getAwardColor(award.key);

            return (
              <motion.div
                key={award.key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Background Gradient Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative bg-card p-6 rounded-2xl shadow-sm border border-muted/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Award Icon */}
                  <div className="text-center mb-4">
                    <div
                      className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Award Content */}
                  <div className="text-center flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {award.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <p className="text-primary font-semibold text-sm">
                        {award.organization}
                      </p>
                      <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                        {award.year}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Projects Delivered', icon: Rocket },
              { number: '100%', label: 'Client Satisfaction', icon: Heart },
              { number: '25K+', label: 'Lines of Code', icon: Code },
              { number: '15+', label: 'Technologies Mastered', icon: Zap },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-card rounded-xl border border-muted/30 hover:border-primary/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-2">
            {t('readyToAchieveGreatResults')} 
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
            <span>{t('letsBuildSomethingAmazing')}</span>
            <Rocket className="h-4 w-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
