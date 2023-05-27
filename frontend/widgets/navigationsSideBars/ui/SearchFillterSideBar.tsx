import React, { useContext } from "react";
import { ThemeContext } from 'styled-components';

import { NavigationSideBarStyled } from "./styled";
import { LinkWithIcon, Margin } from "@shared/ui";

import UserIcon from '@public/friends.svg';
import CommunityIcon from '@public/communityIcon.svg';


interface ISearchFillterSideBarProps {
    search: string
}

export const SearchFillterSideBar: React.FC<ISearchFillterSideBarProps> = ({search}) => {
    const theme = useContext(ThemeContext);

    return (
        <NavigationSideBarStyled>
            <LinkWithIcon href={`/search/user?search=${search}`} text='user' icon={<UserIcon />} isActive={false} />
            <Margin mt={15}>
                <LinkWithIcon href={`/search/community?search=${search}`} text='community' icon={<CommunityIcon  />} isActive={false} />
            </Margin>
        </NavigationSideBarStyled>
    )
}
