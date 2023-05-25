import React from "react";

import { Button } from "@shared/ui";
import { useAcceptFriendRequestMutation } from "@features/relationsButton/api/relationButtonsApi";


interface IAcceptRequestProps {
    frindRequestPK: number
};

export const AcceptRequest: React.FC<IAcceptRequestProps> = ({ frindRequestPK }) => {
    const [ acceptFriendRequest ] = useAcceptFriendRequestMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        acceptFriendRequest(frindRequestPK);
    }

    return (
        <>
            <Button onClick={clickHeandler}>Accept request</Button>
        </>
    )
}
