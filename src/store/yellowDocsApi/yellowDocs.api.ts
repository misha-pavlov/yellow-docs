import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const yellowDocsApi = createApi({
  reducerPath: 'yelloDocsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api/',
  }),
  endpoints: builder => ({
    getAll: builder.query<any, void>({
      query: () => ({
        url: 'getAll',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllQuery } = yellowDocsApi;
