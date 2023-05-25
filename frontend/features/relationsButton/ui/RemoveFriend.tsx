import React from "react";

import { Button } from "@shared/ui";
import { useRemoveFriendMutation } from "@features/relationsButton/api/relationButtonsApi";


interface IRemoveFriendProps {
    username: string
};

export const RemoveFriend: React.FC<IRemoveFriendProps> = ({ username }) => {
    const [ removeFriend ] = useRemoveFriendMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        removeFriend(username);
    }

    return (
        <>
            <Button onClick={clickHeandler}>RemoveFriendMutation</Button>
        </>
    )
}
