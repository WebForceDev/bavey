import React from "react";
import Image from "next/image";
import Link from "next/link";

// import { useAcceptMutation, useRejectMutation, useUnsubscribeMutation } from "../../redux/api/friendrequestApi";
import { FriendReuestInside } from "./style";
import { IUser } from "../../types/user";

import photo from '@public/Avatar.png';
import { Margin } from "@shared/ui";


interface IFriendRequestInsideProps {
    user: IUser,
    message: string,
    outside: boolean
}

const FriendRequestInside: React.FC<IFriendRequestInsideProps> = ({ user, message, outside }) => {
    /*
    const [accept, acceptRresult] = useAcceptMutation();
    const [reject, rejectRresult] = useRejectMutation();
    const [unsubscr, unsubscrRresult] = useUnsubscribeMutation();
    */

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
     
            </Margin>
        </FriendReuestInside>
    )
};

export default FriendRequestInside;
