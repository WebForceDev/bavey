import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL = `http://194.58.107.140:8080`;

interface IUserApiResult {
  token: string,
}


export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1.0/`,
  }),
  endpoints: (builder) => ({
    profile: builder.query<IUserApiResult, void>({
      query: () => ({
        url: 'profile',
        headers: {
          Authorization: `Token ${ localStorage.getItem('token') }`
        }
      })
    }),
  }),
});

export const {
  useProfileQuery
} = userApi;
