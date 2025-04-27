import { configureStore } from '@reduxjs/toolkit';
import { interestReducer } from 'src/features/slices/interestSlice';
import { mostViewedReducer } from 'src/features/slices/mostViewedSlice';

export const store = configureStore({
  reducer: {
    mostViewed: mostViewedReducer,
    interest: interestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
