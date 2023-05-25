import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Margin, Button, Flex} from "@shared/ui";
import { FriendRequestStyled } from "./styled";
import { IFriendRequest } from "../model/types";

import photo from '@public/Avatar.png';


interface IFriendRequestInsideProps {
    friendRequest: IFriendRequest,
    acceptButtonSlot: React.ReactNode,
    rejectButtonSlot: React.ReactNode,
}

export const FriendRequestInside: React.FC<IFriendRequestInsideProps> = ({ friendRequest, acceptButtonSlot, rejectButtonSlot }) => {
    return (
        <FriendRequestStyled>
            <Image
                src={photo}
                alt={friendRequest.sender.username}
                width={90}
                height={90}
            />
            <Margin ml={30}>
                <h2>
                    <Link href={`/user/${friendRequest.sender.username}`}>{ friendRequest.sender.username }</Link>
                </h2>
                <p>
                    { friendRequest.message }
                </p>
                <Flex>
                    { acceptButtonSlot }
                    <Margin ml={20}>
                        { rejectButtonSlot }
                    </Margin>
                </Flex>
            </Margin>
        </FriendRequestStyled>
    )
};
