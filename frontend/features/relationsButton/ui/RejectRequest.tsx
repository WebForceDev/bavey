import React from "react";

import { Button } from "@shared/ui";
import { useRejectFriendRequestMutation } from "@features/relationsButton/api/relationButtonsApi";


interface IRejectRequestProps {
    frindRequestPK: number
};

export const RejectRequest: React.FC<IRejectRequestProps> = ({ frindRequestPK }) => {
    const [ rejectFriendRequest ] = useRejectFriendRequestMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        rejectFriendRequest(frindRequestPK);
    }

    return (
        <>
            <Button onClick={clickHeandler}>Reject request</Button>
        </>
    )
}
