import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../config';
import { DocumentType, OwnedEnum, SortEnum, UserAccessEnum } from '../../types/document.types';
import { UserType } from './../../types/user.types';

type GetRecentDocumentsParams = {
  searchTerm?: string;
  owned: OwnedEnum;
  sort: SortEnum;
};

type EditDocumentParams = {
  documentId: string;
  newTitle?: string;
  newVisibleForUserId?: string;
  newFavouriteUserId?: string;
  newContent?: string;
  updateOpenHistory?: boolean;
  newReadOnlyMemberId?: string;
};

type DocumentIdParams = {
  documentId: string;
};

type ConvertToParams = {
  userId: string;
  documentId: string;
  accessType: UserAccessEnum;
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
    // GET
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
    getOneDocument: builder.query<DocumentType, DocumentIdParams>({
      query: ({ documentId }) => ({ url: 'getOne', method: 'GET', params: { documentId } }),
    }),
    getDocumentUsers: builder.query<UserType[], DocumentIdParams>({
      query: ({ documentId }) => ({
        url: 'getDocumentUsers',
        method: 'GET',
        params: { documentId },
      }),
    }),

    // PATCH
    editDocument: builder.mutation<DocumentType, EditDocumentParams>({
      query: ({
        documentId,
        newTitle,
        newContent,
        updateOpenHistory,
        newFavouriteUserId,
        newVisibleForUserId,
        newReadOnlyMemberId,
      }) => ({
        url: 'edit',
        method: 'PATCH',
        body: {
          documentId,
          newTitle,
          newContent,
          updateOpenHistory,
          newFavouriteUserId,
          newVisibleForUserId,
          newReadOnlyMemberId,
        },
      }),
    }),
    convertTo: builder.mutation<DocumentType, ConvertToParams>({
      query: ({ documentId, userId, accessType }) => ({
        url: 'convertTo',
        method: 'PATCH',
        body: { documentId, userId, accessType },
      }),
    }),

    // DELETE
    deleteDocument: builder.mutation<DocumentType, DocumentIdParams>({
      query: ({ documentId }) => ({
        url: 'delete',
        method: 'DELETE',
        body: {
          documentId,
        },
      }),
    }),
  }),
});

export const {
  useConvertToMutation,
  useGetOneDocumentQuery,
  useEditDocumentMutation,
  useGetDocumentUsersQuery,
  useDeleteDocumentMutation,
  useGetRecentDocumentsQuery,
} = documentApi;
