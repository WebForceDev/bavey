import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPublication } from '../../types/user';

import { HYDRATE } from 'next-redux-wrapper';


const BASE_URL = `http://194.58.107.140:8080`;

interface ISetVoiceResult {
  up_voice_count: number,
  down_voice_count: number,
}

interface ISetVoiceArgs {
    slug: string,
    voiceType: string
}

interface ISavedArgs {
  type_voice: string | string[] | undefined
}

interface ISavedResult {
  publications: [IPublication]
}

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Publication'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1.0/publication/`,
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },

  endpoints: (builder) => ({

    setVoice: builder.mutation<ISetVoiceResult, ISetVoiceArgs>({
        query(req) {
          return {
            url: `${req.slug}/set${req.voiceType}voice`,
            headers: {
              Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
            }
          };
        },
        invalidatesTags: ['Publication']
    }),

    createPublication: builder.mutation<any, any>({
      query(data) {
        return {
          url: '/createPublication',
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
          }
        }
      },
      invalidatesTags: ['Publication']
    }),

    savedPublication: builder.query<ISavedResult, ISavedArgs>({
      query: (req) => ({
        url: `saved/${req.type_voice}`,
        headers: {
          Authorization: `Token ${ JSON.parse(localStorage.getItem('authUser')).token }`
        }
      }),
      providesTags: ['Publication']
    }),

  }),
});

export const {
    useSetVoiceMutation,
    useSavedPublicationQuery,
    useCreatePublicationMutation
} = postApi;
