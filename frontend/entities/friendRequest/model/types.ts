export interface IFriendRequest {
    pk: number,
    sender: {
        username: string,
        userAvatar: string
    },
    recipient: {
        username: string,
        userAvatar: string
    },
    message: string
};
