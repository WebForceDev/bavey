import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IRelation, IFriendRequest } from '../../types/user';


const BASE_URL = `http://194.58.107.140:8080`;

interface IUserApiResult {
  token: string,
}

interface IRelationsApiArg {
  slug: string
}

interface IRelationsApiResult {
  subscribers: [IRelation],
  friends: [IRelation],
  subscriptions: [IRelation],
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User', 'FriendRequest'],
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

    relations: builder.query<IRelationsApiResult, IRelationsApiArg>({
      query: (req) => ({
        url: `relations?slug=${req.slug}`,
        headers: {
          Authorization: `Token ${ localStorage.getItem('token') }`
        } 
      }),
    }),

  }),
});

export const {
  useProfileQuery,
  useRelationsQuery
} = userApi;
