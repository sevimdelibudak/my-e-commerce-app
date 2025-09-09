"use client";
// components/Header.tsx
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';

const Header = () => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'en' ? 'en' : 'tr';
  const t = useTranslations('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href={`/${locale}`} className="flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold cursor-pointer text-white hover:text-blue-300 transition-colors">
              {t('title')}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li>
                <Link href={`/${locale}`} className="text-white hover:text-blue-300 transition-colors font-medium">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products`} className="text-white hover:text-blue-300 transition-colors font-medium">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cart`} className="text-white hover:text-blue-300 transition-colors font-medium">
                  {t('cart')}
                </Link>
              </li>
              <li>
                <LocaleSwitcher />
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-300 transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link 
                  href={`/${locale}`} 
                  className="block text-white hover:text-blue-300 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/products`} 
                  className="block text-white hover:text-blue-300 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/cart`} 
                  className="block text-white hover:text-blue-300 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('cart')}
                </Link>
              </li>
              <li className="pt-2">
                <LocaleSwitcher />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;