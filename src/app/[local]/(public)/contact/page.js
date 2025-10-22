import ContactHero from '@/components/pages/contactPage/ContactHero';
import ContactForm from '@/components/pages/contactPage/ContactForm';
import ContactInfo from '@/components/pages/contactPage/ContactInfo';
import ContactMap from '@/components/pages/contactPage/ContactMap';

export const metadata = {
  title: 'Contact - Ahmed Abdelal',
  description:
    'Get in touch with Ahmed Abdelal for web development projects and collaborations.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ContactHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </div>
    </div>
  );
}
