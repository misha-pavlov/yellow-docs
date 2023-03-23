import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../config';
import { UserSettingsType } from '../../types/userSettings.types';

type UpdateUserSettingsParams = {
  newSettings: UserSettingsType['settings'];
};

export const userSettingsApi = createApi({
  // reducerPath - name your current file
  reducerPath: 'userSettings.api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/userSettings',
    prepareHeaders: headers => {
      const token = localStorage.getItem(constants.localStorageKeys.token);

      if (token) {
        headers.set('x-access-token', token);
      }
    },
  }),
  endpoints: builder => ({
    // POST
    createUserSettings: builder.mutation<UserSettingsType, void>({
      query: () => ({
        url: 'create',
        method: 'POST',
      }),
    }),

    // GET
    getUserSettings: builder.query<UserSettingsType, void>({
      query: () => ({
        url: 'getUserSettings',
        method: 'GET',
      }),
    }),

    // PATCH
    updateUserSettings: builder.mutation<UserSettingsType, UpdateUserSettingsParams>({
      query: ({ newSettings }) => ({
        url: 'updateUserSettings',
        method: 'PATCH',
        body: {
          newSettings,
        },
      }),
    }),
  }),
});

export const {
  useGetUserSettingsQuery,
  useCreateUserSettingsMutation,
  useUpdateUserSettingsMutation,
} = userSettingsApi;
