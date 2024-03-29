import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { existsVieweInStorage, getViewerFromStorage } from '@shared/lib'


const BASE_URL =  process.env['NEXT_PUBLIC_BACKEND_HOST']

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/v1.0/`,
  prepareHeaders: (headers, { getState }) => {
    if (existsVieweInStorage()) {
      const token = getViewerFromStorage().token;
      headers.set('Authorization', `Token ${ token }`)
    }
    return headers
  },
})
