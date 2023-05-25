import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RelationStyled, UserName, UserInfo, UserSendMessage } from './styled';
import { Button, Margin } from "@shared/ui";

import photo from '@public/Avatar.png';


interface IRelation {
    username:string,
    removeFriendButtonSlot: React.ReactNode
}

export const Relation: React.FC<IRelation> = ({ username, removeFriendButtonSlot }) => {
    return (
        <RelationStyled>
            <Image
                src={photo}
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
