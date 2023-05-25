import { IUser } from "@entities/User"


export interface IRelations {
    subscribers: IUser[],
    friends: IUser[],
    subscriptions: IUser[]
}
