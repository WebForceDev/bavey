export interface IPublication {
    title: string,
    slug: string,
    up_voice: [{ user:number }],
    down_voice: [{ user:number }]
}

export interface IUser {
    description: string,
    avatar: string,
    header_image: string,
    slug: string,
    username: string,
    first_name: string,
    last_name: string,
    publications:[IPublication]
}
