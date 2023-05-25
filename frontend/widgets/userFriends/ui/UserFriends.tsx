import React from "react";
import Link from "next/link";

import { UserFriendsStyled, UserFriendsTitleStyled } from "./styled";
import { UserMini } from "@entities/User";
import { Margin } from "@shared/ui";


interface IUserFriendsProps {
    username: string
    friends: any
}

export const UserFriends: React.FC<IUserFriendsProps> = ({ friends, username }) => {
    return (
        <UserFriendsStyled>
            <UserFriendsTitleStyled>
                <Link href={`/friends?username=${username}`}>
                    Friends
                </Link>
            </UserFriendsTitleStyled>
            { friends.map((friend) => (
                <Margin mb={8} key={friend.username}>
                 <UserMini user={friend} />
                </Margin>
            ))}
            { friends.length == 0 && <div>No friends</div> }
        </UserFriendsStyled>
    )
}
