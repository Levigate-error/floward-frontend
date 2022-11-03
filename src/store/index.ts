import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './auth';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
