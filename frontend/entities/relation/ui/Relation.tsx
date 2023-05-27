import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RelationStyled, UserName, UserInfo, UserSendMessage } from './styled';
import { imageLoader } from "@shared/lib";
import { Button, Margin } from "@shared/ui";

import photo from '@public/Avatar.png';


interface IRelation {
    username:string,
    removeFriendButtonSlot: React.ReactNode,
    avatar: string
}

export const Relation: React.FC<IRelation> = ({ username, removeFriendButtonSlot, avatar }) => {
    return (
        <RelationStyled>
            <Image
                loader={imageLoader}
                src={avatar}
                alt={username}
                width={90}
                height={90}
            />
            <UserInfo>
                <UserName>
                    <Link href={`/user/${username}`}>{username}</Link>
                </UserName>
                <UserSendMessage>
                    <Link href={`/user/${username}/sendmessage`}>Send message</Link>
                </UserSendMessage>
              <Margin mt={10}>
                    { removeFriendButtonSlot }
              </Margin>
            </UserInfo>
        </RelationStyled>
    )
};
