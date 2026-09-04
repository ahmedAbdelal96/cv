import site from '@/data/site.json';

export function localized(value, locale = 'en') {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value[locale] || value.en || value.ar || '';
  return value || '';
}

export function getSiteData(locale = 'en') {
  return {
    ...site,
    name: localized(site.name, locale),
    role: localized(site.role, locale),
    location: localized(site.location, locale),
  };
}

export { site };
