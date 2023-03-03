import React from "react";
import Image from "next/image";
import Link from "next/link";

import ButtonStyled from "../../styles/components/Button";
import { FriendReuestInside } from "./style";
import { IUser } from "../../types/user";

import photo from '../../public/Avatar.png';
import Margin from "../../styles/components/Margin";


interface IFriendRequestInsideProps {
    user: IUser,
    message: string
}

const FriendRequestInside: React.FC<IFriendRequestInsideProps> = ({ user, message }) => {
    return (
        <FriendReuestInside>
            <Image
                src={photo}
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
                <ButtonStyled fill>Accept</ButtonStyled>
                <ButtonStyled>Reject</ButtonStyled>
            </Margin>
        </FriendReuestInside>
    )
};

export default FriendRequestInside;
