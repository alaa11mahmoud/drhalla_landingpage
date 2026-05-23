import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'library', href: '#library' },
  { key: 'certifications', href: '#certifications' },
  { key: 'testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-4 group">
            <img src={logo} alt="د. هالة" className="h-14 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-forest font-heading text-xl leading-tight">د. هالة</span>
              <span className="text-sage text-sm leading-tight">صحتك النفسية</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="px-3 py-2 rounded-lg text-forest/70 hover:text-forest hover:bg-sage/10 transition-all text-sm font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <a
              href={`https://wa.me/201207273558`}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 px-4 py-2 rounded-lg bg-coral text-white hover:bg-coral/90 transition-all text-sm font-semibold"
            >
              {t('nav.contact')}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-forest hover:bg-sage/10 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-sage/10 pt-3">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="block px-3 py-2 rounded-lg text-forest/70 hover:text-forest hover:bg-sage/10 transition-all text-sm font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <a
              href={`https://wa.me/201207273558`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 mt-1 rounded-lg bg-coral text-white hover:bg-coral/90 transition-all text-sm font-semibold text-center"
            >
              {t('nav.contact')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
