import { configureStore } from '@reduxjs/toolkit';
import { documentApi } from './documentApi/document.api';
import { userApi } from './userApi/user.api';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApi.middleware, documentApi.middleware),
});
