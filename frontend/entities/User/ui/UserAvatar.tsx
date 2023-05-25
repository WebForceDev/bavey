import React from "react";
import Image from "next/image";

import { imageLoader } from "@shared/lib";
import { IUser } from "../model/types";
import { Button, Flex, Margin } from "@shared/ui";
import { UserAvetarStyled } from "@entities/User/ui/styled";
import { useGetRelationForUserQuery } from "@entities/relation";


interface IUserAvetarProps {
    user: IUser,
    unsubscribeSlot: React.ReactNode,
    unfriendSlot: React.ReactNode,
    subscribeSlot: React.ReactNode,
}

export const UserAvetar: React.FC<IUserAvetarProps> = ({ user, unfriendSlot, unsubscribeSlot, subscribeSlot }) => {
    const { data, isLoading } = useGetRelationForUserQuery(user.username);

    return (
        <UserAvetarStyled>
            <Image  loader={imageLoader}  src={user.avatar} width={150} height={150} alt={user.username} />
            <Margin mt={15}>
                <Button>Send Message</Button>
                <Flex alignItems="center" justifyContent="center" flexDirection="column">
                    { !isLoading && data.relationship_type == 'subscribed' &&
                        unsubscribeSlot
                    }
                    { !isLoading && data.relationship_type == 'friend' &&
                        unfriendSlot
                    }
                        
                    { !isLoading && data.relationship_type == 'stranger' &&
                        subscribeSlot
                    }
                </Flex>
            </Margin>
        </UserAvetarStyled>
    )
};
