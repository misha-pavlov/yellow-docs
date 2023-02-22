import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

export const userApi = createApi({
  // reducerPath - name your current file
  reducerPath: 'user.api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/user',
  }),
  endpoints: builder => ({
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
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
