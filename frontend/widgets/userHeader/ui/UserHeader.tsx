import React from "react";

import { Logo, Wrapper, Flex, Margin } from "@shared/ui";
import { UserAvetar, UserInfo } from "@entities/User";
import { UserHeaderStyled } from "@widgets/userHeader/ui/styled";
import { RemoveFriend, UnsubscribeFromUser, CreateFriendRequest } from '@features/relationsButton';
import { IUser } from '@entities/User'


interface IUserHeaderProps {
    user: IUser
}

export const UserHeader: React.FC<IUserHeaderProps> = ({ user }) => {
    return (
        <UserHeaderStyled>
            <Wrapper>
                <Flex justifyContent="flex-start" alignItems="flex-start">
                    <UserAvetar
                        user={user}
                        subscribeSlot={<CreateFriendRequest username={user.username} />}
                        unfriendSlot={<RemoveFriend username={user.username} />}
                        unsubscribeSlot={<UnsubscribeFromUser username={user.username}  />}
                    />
                    <Margin ml={50}>
                        <UserInfo user={user} />
                    </Margin>
                </Flex>
            </Wrapper>
        </UserHeaderStyled>
    )
}
