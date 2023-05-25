import { baseApi } from '../../../shared/api'
import { type IFriendRequest} from '../model/types'


interface IFriendReqrusetsApiResult {
    outside: [IFriendRequest],
    inside: [IFriendRequest]
}

export const friendRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    friendRequests: builder.query<IFriendReqrusetsApiResult, void>({
      query: (req) => ({
        url: `relations_api/friend_requests`
      }),
      providesTags: ['FriendRequests']
    }),
  })
})

export const {
  useFriendRequestsQuery
} = friendRequestApi;
