import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RelationStyled, UserName, UserInfo, UserSendMessage } from './style';

import photo from '../../public/Avatar.png';


const Relation = () => {
    return (
        <RelationStyled>
            <Image
                src={photo}
                alt="user"
                width={90}
                height={90}
            />
            <UserInfo>
                <UserName>
                    <Link href='/user/root'>Root</Link>
                </UserName>
                <UserSendMessage>
                    <Link href='/user/root/sendmessage'>Send message</Link>
                </UserSendMessage>
            </UserInfo>
        </RelationStyled>
    )
};

export default Relation;