import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi/user.api';
import { documentApi } from './documentApi/document.api';
import { userSettingsApi } from './userSettingsApi/userSettings.api';
import { templatesApi } from './templatesApi/templates.api';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [userSettingsApi.reducerPath]: userSettingsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      documentApi.middleware,
      templatesApi.middleware,
      userSettingsApi.middleware
    ),
});
