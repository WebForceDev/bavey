import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FriendRequestStyled } from "./styled";
import { Margin, Button } from "@shared/ui";
import { IFriendRequest } from "../model/types";

import photo from '@public/Avatar.png';


interface IFriendRequestOutsideProps {
    friendRequest: IFriendRequest,
    unsubscribeButtonSlot: React.ReactNode
}

export const FriendRequestOutside: React.FC<IFriendRequestOutsideProps> = ({ friendRequest, message, unsubscribeButtonSlot }) => {
    return (
        <FriendRequestStyled>
        <Image
            src={photo}
            alt={friendRequest.recipient.username}
            width={90}
            height={90}
        />
        <Margin ml={30}>
            <h2>
                <Link href={`/user/${friendRequest.recipient.username}`}>{ friendRequest.recipient.username }</Link>
            </h2>
            { unsubscribeButtonSlot }
        </Margin>
    </FriendRequestStyled>
    )
};

