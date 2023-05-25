import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { ICommunity } from '../../types/user';


const BASE_URL = `http://194.58.107.140:8080`;

interface ICommunityInfoRes {
  community: ICommunity
}

export const communityApi = createApi({
  reducerPath: 'communityApi',
  tagTypes: ['Community', 'CommunityStatistic', 'Publication'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1.0/community/`,
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },

  endpoints: (builder) => ({
    
    getCommunityInfo: builder.query<ICommunityInfoRes, any>({
        query: (req) => ({
          url: `${req.slug}`
        }),
        providesTags: ['Community']
    }),

    getSubscriptionsList: builder.query<ICommunityInfoRes, void>({
      query: () => ({
        url: `subscriptions`,
        headers: {
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        },
      }),
      providesTags: ['CommunityStatistic']
    }),

    getCommunityStatistic: builder.query<any, any>({
        query: (req) => ({
          url: `${req.slug}/statistic`,
          headers: {
            Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
          },
        }),
        providesTags: ['CommunityStatistic']
    }),

    isCommunitySubscribe: builder.query<any, any>({
      query: (req) => ({
        url: `${req.slug}/status`,
        headers: {
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        },
      }),
      providesTags: ['CommunityStatistic']
    }),

    subscribeToCommunity: builder.mutation<any, any>({
        query(req) {
          return {
            url: `${req.slug}/subscribe`,
            headers: {
              Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
            }
          };
        },
        invalidatesTags: ['CommunityStatistic']
    }),

    getPulicationList: builder.query<string[], any>({
      query: (req) => ({
        url: `${req.slug}/publications?offset=${req.offset}&limit=${req.limit}`,
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ['Publication']
    }),

  }),
});

export const {
    useGetCommunityInfoQuery,
    useGetCommunityStatisticQuery,
    useSubscribeToCommunityMutation,
    useIsCommunitySubscribeQuery,
    useGetSubscriptionsListQuery,
    useGetPulicationListQuery
} = communityApi;
