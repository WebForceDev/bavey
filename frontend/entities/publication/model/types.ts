export interface IPublication {
    publication: {
        title: string,
        slug: string,
        up_voice: [{ user:number }],
        down_voice: [{ user:number }],
    }
    owner: {
        username: string
    }
}
