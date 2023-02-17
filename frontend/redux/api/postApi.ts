import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL = `http://194.58.107.140:8080`;

interface ISetVoiceResult {
  up_voice_count: number,
  down_voice_count: number,
}

interface ISetVoiceArgs {
    slug: string,
    voiceType: string
}

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1.0/publication/`,
  }),
  endpoints: (builder) => ({

    setVoice: builder.mutation<ISetVoiceResult, ISetVoiceArgs>({
        query(req) {
          return {
            url: `${req.slug}/set${req.voiceType}voice`,
            headers: {
              Authorization: `Token ${ localStorage.getItem('token') }`
            }
          };
        },
    }),

    createPublication: builder.mutation<any, any>({
      query(data) {
        return {
          url: '/createPublication',
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Token ${ localStorage.getItem('token') }`
          }
        };
      },
  })

  }),
});

export const {
    useSetVoiceMutation,
    useCreatePublicationMutation
} = postApi;