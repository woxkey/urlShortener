import {configureStore} from '@reduxjs/toolkit';
import linkSlice from './features/links/linkSlice';

export const store = configureStore({
  reducer: {
    links: linkSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
