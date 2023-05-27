import React from "react";
import Image from "next/image";
import Link from "next/link";

import ButtonStyled from "../../styles/components/Button";
import { imageLoader } from "@shared/lib";
import { useAcceptMutation, useRejectMutation, useUnsubscribeMutation } from "../../redux/api/friendrequestApi";
import { FriendReuestInside } from "./style";
import { IUser } from "../../types/user";

import Margin from "../../styles/components/Margin";


interface IFriendRequestInsideProps {
    user: IUser,
    message: string,
    outside: boolean,
    avatar: string
}

const FriendRequestInside: React.FC<IFriendRequestInsideProps> = ({ user, message, outside, avatar }) => {
    const [accept, acceptRresult] = useAcceptMutation();
    const [reject, rejectRresult] = useRejectMutation();
    const [unsubscr, unsubscrRresult] = useUnsubscribeMutation();

    return (
        <FriendReuestInside>
            <Image
                loader={imageLoader}
                src={avatar}
                alt={user.slug}
                width={90}
                height={90}
            />
            <Margin mg="0 0 0 35px">
                <h2>
                    <Link href={`/user/${user.slug}`}>{ user.username }</Link>
                </h2>
                <p>
                    { message }
                </p>

            { outside ?
                <>
                    <ButtonStyled fill onClick={() => unsubscr({slug: user.slug})}>Unsubscribe</ButtonStyled>
                </>
                : 
                <>
                    <ButtonStyled fill onClick={() => accept({slug: user.slug})}>Accept</ButtonStyled>
                    <ButtonStyled onClick={() => reject({slug: user.slug})}>Reject</ButtonStyled>
                </>
            }
            </Margin>
        </FriendReuestInside>
    )
};

export default FriendRequestInside;
