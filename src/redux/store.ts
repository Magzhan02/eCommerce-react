import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filter from './filter/slice';

export const store = configureStore({
  reducer: {
    filter,
  },
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
