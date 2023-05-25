import { baseApi } from '../../../shared/api';


interface IcreatePublicationArgs {
    wallSlug: string,
    wallType: string,
    title: string,

}

export const publicationCreatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createPublication: builder.mutation<any, IcreatePublicationArgs>({
        query({ wallType, wallSlug, title }) {
          return {
            url: `blog_api/${wallType}/${wallSlug}/publications`,
            method: 'POST',
            body: {
                title: title
            }
          };
        },
        invalidatesTags: ['Statistic']
    }),

  })
})

export const {
    useCreatePublicationMutation
} = publicationCreatorApi;
    