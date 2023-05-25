import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper'

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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    profile: builder.query<IUserApiResult, void>({
      query: () => ({
        url: 'profile',
        headers: {
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        }
      })
    }),

    relations: builder.query<IRelationsApiResult, IRelationsApiArg>({
      query: (req) => ({
        url: `relations?slug=${req.slug}`,
        headers: {
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        } 
      }),
      providesTags: ['User']
    }),

    updateUser: builder.mutation<any, any>({
      query(data) {
        return {
          url: '/profile',
          method: 'PUT',
          body: data,
          headers: {
            Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
          }
        };
      },
      invalidatesTags: ['User']
    }),

  }),
});

export const {
  useProfileQuery,
  useRelationsQuery,
  useUpdateUserMutation
} = userApi;
