import { baseApi } from '../../../shared/api'
import { IPublication } from '@entities/publication'


interface ISavedPuvlicationListResult {
    saved_voices_up: [IPublication],
    saved_voices_down: [IPublication],
    saved_bookmarks: [IPublication]
}

export const savedPublicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSavedPublicationList: builder.query<ISavedPuvlicationListResult, void>({
      query: () => {
        return {
        url: `blog_api/publications/saved`,
      }},
    }),
    
  })
})

export const {
  useGetSavedPublicationListQuery
} = savedPublicationApi
