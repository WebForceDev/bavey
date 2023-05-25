export interface IPublicationUserWall {
    title: string,
    slug: string,
    up_voice: [{ user:number }],
    down_voice: [{ user:number }],
    autor: {
        username: string,
        avatar: string
    }
}

export interface IPublicationCommunityWall {
    title: string,
    slug: string,
    up_voice: [{ user:number }],
    down_voice: [{ user:number }],
    autor: {
        title: string,
        avatar: string
    }
}
