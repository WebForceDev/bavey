import { baseApi } from '../../../shared/api'
import { IViewer } from '@entities/viewer/model/types'


interface ILoginResult {
    token: string,
    user: IViewer
}

interface ILoginArgs {
    username: string,
    password: string
}


export const viewerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<ILoginResult, ILoginArgs>({
      query(data) {
        return {
          url: 'auth_api/login',
          method: 'POST',
          body: data
        };
      },
    })
    
  })
})

export const {
  useLoginMutation
} = viewerApi;
