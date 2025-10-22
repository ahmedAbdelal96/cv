/**
 * Public layout component
 * For pages accessible to everyone (no authentication required)
 * Includes Header and Footer
 */
//import Header from '@/components/Header';
//import Footer from '@/components/Footer';
//import BackToTop from '@/components/BackToTop';

import Header from '@/components/header/Header';

export default function PublicLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {/* <Footer />
      <BackToTop /> */}
    </div>
  );
}
