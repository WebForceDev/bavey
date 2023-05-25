import React from "react";

import { HeaderStyled } from "./styled";
import { Logo, Wrapper, Margin, Flex } from "@shared/ui";
import { existsVieweInStorage } from '@shared/lib';
import { NavigationSelect } from "@features/NavigationSelect";
import { ProfileMenu } from "@features/profileMenu/ui/ProfileMenu";


export const Header: React.FC = () => {
    const isAuthenticated = existsVieweInStorage();
    return (
        <HeaderStyled>
            <Wrapper>
                <Flex alignItems="center" justifyContent="space-between">
                    <div>
                        <Logo />
                        <Margin ml={185}>
                            <NavigationSelect />
                        </Margin>
                    </div>
                    { (isAuthenticated && process.browser) && <ProfileMenu />}
                    { (!isAuthenticated && process.browser) && <h1>sdf</h1>}
                </Flex>
            </Wrapper>
        </HeaderStyled>
    )
}
