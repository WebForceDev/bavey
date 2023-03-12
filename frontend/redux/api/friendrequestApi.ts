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
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        },
      }),
      providesTags: ['FriendRequest']
    }),

    relationType: builder.query<any, ISlugArgs>({
      query: (req) => ({
        url: `relations/type/${req.slug}`,
        headers: {
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        },
      }),
      providesTags: ['FriendRequest']
    }),

    accept: builder.mutation<any, ISlugArgs>({
        query(req) {
          return {
            url: `friendrequest/accept/${req.slug}`,
            headers: {
              Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
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
              Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
            }
          };
        },
        invalidatesTags: ['FriendRequest']
    }),

    subscribe: builder.mutation<any, ISlugArgs>({
      query(req) {
        return {
          url: `friendrequest/create/${req.slug}`,
          headers: {
            Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
          },
          method: 'POST'
        };
      },
      invalidatesTags: ['FriendRequest']
    }),

    unsubscribe: builder.mutation<any, ISlugArgs>({
        query(req) {
          return {
            url: `relations/unsubscribe/${req.slug}`,
            headers: {
              Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
            }
          };
        },
        invalidatesTags: ['FriendRequest']
    }),

    deletefriend: builder.mutation<any, ISlugArgs>({
      query(req) {
        return {
          url: `relations/deletefriend/${req.slug}`,
          headers: {
            Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
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
    useRelationTypeQuery,
    useSubscribeMutation,
    useDeletefriendMutation
} = friendrequestApi;
