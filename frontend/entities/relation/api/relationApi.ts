import { baseApi } from '../../../shared/api'
import { IRelations } from '../model/types'


export const relationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getRelation: builder.query<IRelations, string>({
      query: (username) => ({
        url: `relations_api/relations?username=${username}`
      }),
      providesTags: ['Relation']
    }),

    getRelationForUser: builder.query<string, string>({
      query: (username) => ({
        url: `relations_api/relations/${username}`
      }),
      providesTags: ['Relation']
    }),
    
  })
})

export const {
  useGetRelationQuery,
  useGetRelationForUserQuery,
} = relationApi;
