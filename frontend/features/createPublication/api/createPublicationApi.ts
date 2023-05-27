import { baseApi } from '../../../shared/api';


interface IcreatePublicationArgs {
    wallSlug: string,
    wallType: string,
    body: FormData
}

export const publicationCreatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createPublication: builder.mutation<any, IcreatePublicationArgs>({
        query({ wallType, wallSlug, body }) {
          return {
            url: `blog_api/${wallType}/${wallSlug}/publications`,
            method: 'POST',
            body: body,
          };
        },
        invalidatesTags: ['Statistic']
    }),

  })
})

export const {
    useCreatePublicationMutation
} = publicationCreatorApi;
    