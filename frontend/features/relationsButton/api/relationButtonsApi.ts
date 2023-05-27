import { baseApi } from '../../../shared/api';


interface ICreateFriendRequestArgs {
    username: string,
    message: string
}

export const friendRequestButtonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    acceptFriendRequest: builder.mutation<any, number>({
        query(pk) {
          return {
            url: `relations_api/friend_requests/${pk}/accept`,
            method: 'PUT'
          };
        },
        invalidatesTags: ['FriendRequests', 'Relation']
    }),

    rejectFriendRequest: builder.mutation<any, number>({
        query(pk) {
          return {
            url: `relations_api/friend_requests/${pk}/reject`,
            method: 'PUT'
          };
        },
        invalidatesTags: ['FriendRequests']
    }),

    removeFriend: builder.mutation<any, string>({
        query(username) {
          return {
            url: `relations_api/relations/${username}/removefriend`,
            method: 'PUT'
          };
        },
        invalidatesTags: ['Relation', 'Statistic']
    }),

    unsubscribeFromUser: builder.mutation<any, string>({
        query(username) {
          return {
            url: `relations_api/relations/${username}/unsubscribe`,
            method: 'PUT'
          };
        },
        invalidatesTags: ['Relation', 'FriendRequests', 'Statistic']
    }),

    createFriendRequest: builder.mutation<any, ICreateFriendRequestArgs>({
        query(friendRequest) {
          return {
            url: `relations_api/friend_requests`,
            method: 'POST',
            body: friendRequest
          };
        },
        invalidatesTags: ['FriendRequests', 'Relation', 'Statistic']
    }),

  })
})

export const {
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useCreateFriendRequestMutation,
  useUnsubscribeFromUserMutation,
  useRemoveFriendMutation
} = friendRequestButtonApi;
