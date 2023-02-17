import { configureStore } from '@reduxjs/toolkit';
import { yellowDocsApi } from './yellowDocsApi/yellowDocs.api';

export const store = configureStore({
  reducer: {
    [yellowDocsApi.reducerPath]: yellowDocsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(yellowDocsApi.middleware),
});
