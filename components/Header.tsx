"use client";
// components/Header.tsx
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';

const Header = () => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'en' ? 'en' : 'tr';
  const t = useTranslations('header');
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={`/${locale}`}>
          <span className="text-2xl font-bold cursor-pointer">{t('title')}</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href={`/${locale}`}>
                <span className="hover:text-gray-300">{t('home')}</span>
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/products`}>
                <span className="hover:text-gray-300">{t('products')}</span>
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/cart`}>
                <span className="hover:text-gray-300">{t('cart')}</span>
              </Link>
            </li>
            <li>
              <LocaleSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;