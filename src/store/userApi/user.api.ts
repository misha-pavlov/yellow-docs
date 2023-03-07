import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../config';
import { UserType } from '../../types/user.types';

type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type UserByIdParams = {
  userId: string;
};

export const userApi = createApi({
  // reducerPath - name your current file
  reducerPath: 'user.api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/user',
    prepareHeaders: headers => {
      const token = localStorage.getItem(constants.localStorageKeys.token);

      if (token) {
        headers.set('x-access-token', token);
      }
    },
  }),
  endpoints: builder => ({
    // POST
    signUp: builder.mutation<UserType, SignUpParams>({
      query: ({ firstName, lastName, email, password }) => ({
        url: 'signup',
        method: 'POST',
        body: {
          firstName,
          lastName,
          email,
          password,
        },
      }),
    }),
    signIn: builder.mutation<UserType, SignInParams>({
      query: ({ email, password }) => ({
        url: 'signin',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),

    // GET
    currentUser: builder.query<UserType, void>({
      query: () => ({
        url: 'currentUser',
        method: 'GET',
      }),
    }),
    userById: builder.query<UserType, UserByIdParams>({
      query: ({ userId }) => ({
        url: 'userById',
        method: 'GET',
        params: {
          userId,
        },
      }),
    }),
  }),
});

export const {
  useUserByIdQuery,
  useSignUpMutation,
  useSignInMutation,
  useCurrentUserQuery,
} = userApi;
