import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../config';
import { TemplatesType } from '../../types/templates.types';

type CreateTemplateParams = {
  title: string;
  content: string;
};

type GetTemplatesForUserParams = {
  limit?: number;
};

export const templatesApi = createApi({
  // reducerPath - name your current file
  reducerPath: 'templates.api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/templates',
    prepareHeaders: headers => {
      const token = localStorage.getItem(constants.localStorageKeys.token);

      if (token) {
        headers.set('x-access-token', token);
      }
    },
  }),
  endpoints: builder => ({
    // POST
    createTemplate: builder.mutation<TemplatesType, CreateTemplateParams>({
      query: ({ title, content }) => ({
        url: 'create',
        method: 'POST',
        body: {
          title,
          content,
        },
      }),
    }),

    // GET
    getTemplatesForUser: builder.query<TemplatesType[], GetTemplatesForUserParams>({
      query: ({ limit }) => ({
        url: 'getTemplatesForUser',
        method: 'GET',
        params: {
          limit,
        },
      }),
    }),
  }),
});

export const { useCreateTemplateMutation, useGetTemplatesForUserQuery } = templatesApi;
