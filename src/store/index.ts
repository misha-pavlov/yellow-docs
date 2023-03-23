import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi/user.api';
import { documentApi } from './documentApi/document.api';
import { userSettingsApi } from './userSettingsApi/userSettings.api';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [userSettingsApi.reducerPath]: userSettingsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      documentApi.middleware,
      userSettingsApi.middleware
    ),
});
