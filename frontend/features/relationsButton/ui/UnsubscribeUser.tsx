import React from "react";

import { Button } from "@shared/ui";
import { useUnsubscribeFromUserMutation } from "@features/relationsButton/api/relationButtonsApi";


interface IUnsubscribeFromUserProps {
    username: string
};

export const UnsubscribeFromUser: React.FC<IUnsubscribeFromUserProps> = ({ username }) => {
    const [ unsubscribeFromUser ] = useUnsubscribeFromUserMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        unsubscribeFromUser(username);
    }

    return (
        <>
            <Button onClick={clickHeandler}>unsubscribeFromUser</Button>
        </>
    )
}
