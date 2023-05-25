import React from "react";

import { NavigationSideBarStyled } from "./styled";
import { LinkWithIcon, Margin } from "@shared/ui";

import FriendsIcon from '@public/friends.svg';
import InsideIcon from '@public/inside.svg';
import OutsideIcon from '@public/outside.svg';


export const RelationsNavigationSideBar: React.FC  = () => {
    return (
        <NavigationSideBarStyled>
            <LinkWithIcon href="/friends" text='Friends' icon={<FriendsIcon />} isActive={false} />
            <Margin mt={15}>
                <LinkWithIcon href="/friendsRequests#inside" text='requests inside' icon={<InsideIcon />} isActive={false} />
            </Margin>
            <Margin mt={15}>
                <LinkWithIcon href="/friendsRequests#outside" text='requests outisde' icon={<OutsideIcon />} isActive={false} />
            </Margin>
        </NavigationSideBarStyled>
    )
}
