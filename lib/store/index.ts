// lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Yolun doğru olduğundan emin olun: './cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Reducer adı 'cart' olmalı
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;