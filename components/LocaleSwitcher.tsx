'use client';

import {usePathname, useRouter} from 'next/navigation';

function getToggledLocale(current: string): 'tr' | 'en' {
  return current === 'en' ? 'tr' : 'en';
}

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] === 'tr' || segments[0] === 'en' ? segments[0] : 'tr';
  const nextLocale = getToggledLocale(currentLocale);

  function handleToggle() {
    const newSegments = [...segments];
    if (newSegments[0] === 'tr' || newSegments[0] === 'en') {
      newSegments[0] = nextLocale;
    } else {
      newSegments.unshift(nextLocale);
    }
    const newPath = '/' + newSegments.join('/');
    router.push(newPath);
  }

  return (
    <button
      onClick={handleToggle}
      className="border border-white/30 rounded px-3 py-1 text-sm hover:bg-white/10"
      aria-label="Toggle language"
    >
      {currentLocale.toUpperCase()} ▸ {nextLocale.toUpperCase()}
    </button>
  );
}


