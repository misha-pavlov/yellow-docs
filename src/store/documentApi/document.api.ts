import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../config';
import { DocumentType, OwnedEnum, SortEnum } from '../../types/document.types';

type GetRecentDocumentsParams = {
  searchTerm?: string;
  owned: OwnedEnum;
  sort: SortEnum;
};

export const documentApi = createApi({
  // reducerPath - name your current file
  reducerPath: 'document.api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/document',
    prepareHeaders: headers => {
      const token = localStorage.getItem(constants.localStorageKeys.token);

      if (token) {
        headers.set('x-access-token', token);
      }
    },
  }),
  endpoints: builder => ({
    getRecentDocuments: builder.query<DocumentType[], GetRecentDocumentsParams>({
      query: ({ owned, sort, searchTerm }) => ({
        url: 'getRecentDocuments',
        method: 'GET',
        params: {
          owned,
          sort,
          searchTerm,
        },
      }),
    }),
  }),
});

export const { useGetRecentDocumentsQuery } = documentApi;
