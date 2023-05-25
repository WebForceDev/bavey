import { baseApi } from '../../../shared/api'
import { IUser } from '../model/types'
import { IPublication } from '@entities/publication'


interface IUserApiResult {
    user: IUser
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getUser: builder.query<IUserApiResult, string>({
      query: (username) => ({
        url: `blog_api/user/${username}`
      })
    }),

    getUserStatistic: builder.query<IUserApiResult, string>({
      query: (username) => ({
        url: `blog_api/user/${username}/statistic`
      }),
      providesTags: ['Statistic']
    }),
    
    getPublicationList: builder.query<IPublication[], any>({
      query: (req) => {
        return {
        url: `blog_api/user/${req.username}/publications?offset=${req.offset}&limit=${req.limit}`,
      }},
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),
    
  })
})

export const {
  useGetUserQuery,
  useGetPublicationListQuery,
  useGetUserStatisticQuery,
} = userApi
