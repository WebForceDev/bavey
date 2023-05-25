import { baseApi } from '../../../shared/api';


interface ISetVoiceArgs {
    voiceType: string,
    publicationSlug: string
}

export const voicesButtonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    setVoice: builder.mutation<any, ISetVoiceArgs>({
        query({ publicationSlug, voiceType }) {
          return {
            url: `blog_api/publications/${publicationSlug}/voices`,
            method: 'POST',
            body: {
                voice_type: voiceType
            }
          };
        },
        invalidatesTags: ['Voice']
    }),

  })
})

export const {
    useSetVoiceMutation
} = voicesButtonApi;
