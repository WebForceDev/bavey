import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IFriendRequest } from '../../types/user';


const BASE_URL = `http://194.58.107.140:8080`;

interface ISlugArgs {
    slug: string,
}

interface IFriendReqrusetsApiResult {
  outside: [IFriendRequest],
  inside: [IFriendRequest]
}

export const friendrequestApi = createApi({
  reducerPath: 'friendrequestApi',
  tagTypes: ['FriendRequest'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1.0/`,
  }),
  endpoints: (builder) => ({

    friendRequests: builder.query<IFriendReqrusetsApiResult, void>({
      query: (req) => ({
        url: `profile/friendrequest`,
        headers: {
          Authorization: `Token ${ localStorage.getItem('token') }`
        },
      }),
      providesTags: ['FriendRequest']
    }),

    relationType: builder.query<any, ISlugArgs>({
      query: (req) => ({
        url: `relations/type/${req.slug}`,
        headers: {
          Authorization: `Token ${ localStorage.getItem('token') }`
        },
      })
    }),

    accept: builder.mutation<any, ISlugArgs>({
        query(req) {
          return {
            url: `friendrequest/accept/${req.slug}`,
            headers: {
              Authorization: `Token ${ localStorage.getItem('token') }`
            }
          };
        },
        invalidatesTags: ['FriendRequest']
    }),

    reject: builder.mutation<any, ISlugArgs>({
        query(req) {
          return {
            url: `friendrequest/reject/${req.slug}`,
            headers: {
              Authorization: `Token ${ localStorage.getItem('token') }`
            }
          };
        },
        invalidatesTags: ['FriendRequest']
    }),

    unsubscribe: builder.mutation<any, ISlugArgs>({
        query(req) {
          return {
            url: `relations/unsubscribe/${req.slug}`,
            headers: {
              Authorization: `Token ${ localStorage.getItem('token') }`
            }
          };
        },
        invalidatesTags: ['FriendRequest']
    })

  }),
});

export const {
    useFriendRequestsQuery,
    useAcceptMutation,
    useRejectMutation,
    useUnsubscribeMutation,
    useRelationTypeQuery
} = friendrequestApi;
