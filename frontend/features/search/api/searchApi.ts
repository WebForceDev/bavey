import { baseApi } from '../../../shared/api';


interface ISearchArgs {
    search: string,
    fillter: string
}

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    search: builder.query<any, ISearchArgs>({
        query({ search, fillter }) {
          return {
            url: `/search_api/query?search=${search}&fillter=${fillter}`
          };
        }
    }),

  })
})

export const {
    useSearchQuery
} = searchApi;
