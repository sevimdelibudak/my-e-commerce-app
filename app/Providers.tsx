// app/Providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store'; // Redux store'u import edin

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}