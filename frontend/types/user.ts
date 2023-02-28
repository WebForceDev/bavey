export interface IUserMini {
    username:string,
    slug:string
}

export interface IPublication {
    title: string,
    slug: string,
    up_voice: [{ user:number }],
    down_voice: [{ user:number }],
    autor: IUserMini
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

export interface IRelation  {
    from_user: IUser,
    to_user: IUser,
    relationships_type: string
}
