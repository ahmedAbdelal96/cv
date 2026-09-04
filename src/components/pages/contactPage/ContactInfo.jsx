'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Linkedin,
  Github,
  Twitter,
} from 'lucide-react';

export default function ContactInfo({ site = {} }) {
  const t = useTranslations('ContactPage.ContactInfo');

  const contactDetails = [
    {
      icon: Mail,
      label: t('contactDetails.email'),
      value: site.email || '',
      href: site.email ? `mailto:${site.email}` : '#',
    },
    {
      icon: Phone,
      label: t('contactDetails.phone'),
      value: site.phone || '',
      href: site.phoneInternational ? `tel:${site.phoneInternational}` : '#',
    },
    {
      icon: Phone,
      label: t('contactDetails.whatsapp'),
      value: site.whatsapp || site.phone || '',
      href: site.whatsappInternational ? `https://wa.me/${site.whatsappInternational}` : '#',
    },
    {
      icon: MapPin,
      label: t('contactDetails.location'),
      value: site.location || '',
      href: '#',
    },
    {
      icon: Clock,
      label: t('contactDetails.availability'),
      value: site.availability || 'Available for remote work',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: t('social.linkedin'),
      href: site.social?.linkedin,
      color: 'hover:text-blue-600',
    },
    {
      icon: Github,
      label: t('social.github'),
      href: site.social?.github,
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      icon: Twitter,
      label: t('social.twitter'),
      href: site.social?.twitter,
      color: 'hover:text-blue-400',
    },
    {
      icon: Globe,
      label: t('social.website'),
      href: site.social?.website,
      color: 'hover:text-teal-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('title')}
      </h2>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => {
          const IconComponent = detail.icon;
          return (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {detail.label}
                </p>
                {detail.href && detail.href !== '#' ? (
                  <a
                    href={detail.href}
                    className="text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {detail.value}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('social.title')}
        </h3>
        <div className="flex space-x-4">
          {socialLinks.filter((social) => social.href).map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-200 hover:scale-110 transform`}
                aria-label={social.label}
              >
                <IconComponent className="w-5 h-5" />
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-teal-50 dark:bg-teal-900/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-2">
            {t('guarantee.title')}
          </h3>
          <p className="text-teal-700 dark:text-teal-300 text-sm">
            {t('guarantee.description')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
