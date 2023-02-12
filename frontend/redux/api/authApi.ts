import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL = `http://194.58.107.140:8080`;

interface ILoginResult {
    token: string,
}

interface ILoginArgs {
    username: string,
    password: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1.0/auth/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResult, ILoginArgs>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data
        };
      },
    })
  }),
});

export const {
    useLoginMutation
} = authApi;
