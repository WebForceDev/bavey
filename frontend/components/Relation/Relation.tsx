import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RelationStyled, UserName, UserInfo, UserSendMessage } from './style';

import photo from '../../public/Avatar.png';


interface IRelation {
    slug:string
}

const Relation: React.FC<IRelation> = ({ slug }) => {
    return (
        <RelationStyled>
            <Image
                src={photo}
                alt={slug}
                width={90}
                height={90}
            />
            <UserInfo>
                <UserName>
                    <Link href={`/user/${slug}`}>{slug}</Link>
                </UserName>
                <UserSendMessage>
                    <Link href={`/user/${slug}/sendmessage`}>Send message</Link>
                </UserSendMessage>
            </UserInfo>
        </RelationStyled>
    )
};

export default Relation;