import React from "react";

import { Button } from "@shared/ui";
import { useCreateFriendRequestMutation } from "@features/relationsButton/api/relationButtonsApi";


interface ICreateFriendRequestProps {
    username: string
};

export const CreateFriendRequest: React.FC<ICreateFriendRequestProps> = ({ username }) => {
    const [ createFriendReqeust ] = useCreateFriendRequestMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        createFriendReqeust({username: username, message: ''});
    }

    return (
        <>
            <Button onClick={clickHeandler}>Create friend request</Button>
        </>
    )
}
