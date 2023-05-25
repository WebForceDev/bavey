import React from "react";
import Image from "next/image";
import Link from "next/link";

import ButtonStyled from "../../styles/components/Button";
// import { useAcceptMutation, useRejectMutation, useUnsubscribeMutation } from "../../redux/api/friendrequestApi";
import { FriendReuestStyled } from "./styled";
import { IFriendRequest } from "../model/types";

import photo from '@public/Avatar.png';
import { Margin } from "@shared/ui";


interface IFriendRequestInsideProps {
    friendRequest: IFriendRequest,
    message: string,
    outside: boolean
}

const FriendReuest: React.FC<IFriendRequestInsideProps> = ({ friendRequest, message, outside }) => {
    /*
    const [accept, acceptRresult] = useAcceptMutation();
    const [reject, rejectRresult] = useRejectMutation();
    const [unsubscr, unsubscrRresult] = useUnsubscribeMutation();
    */

    return (
        <FriendReuestStyled>
            <Image
                src={photo}
                alt={user.slug}
                width={90}
                height={90}
            />
            <Margin ml={30}>
                <h2>
                    <Link href={`/user/${user.slug}`}>{ user.username }</Link>
                </h2>
                <p>
                    { message }
                </p>
     
            </Margin>
        </FriendReuestStyled>
    )
};

export default FriendReuest;
