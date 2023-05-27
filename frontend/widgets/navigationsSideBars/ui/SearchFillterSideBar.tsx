import React, { useContext } from "react";
import { ThemeContext } from 'styled-components';

import { NavigationSideBarStyled } from "./styled";
import { LinkWithIcon, Margin } from "@shared/ui";

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import UpVoiceIcon from '@public/upVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';


interface ISearchFillterSideBarProps {
    search: string
}

export const SearchFillterSideBar: React.FC<ISearchFillterSideBarProps> = ({search}) => {
    const theme = useContext(ThemeContext);

    return (
        <NavigationSideBarStyled>
            <LinkWithIcon href={`/search/user?search=${search}`} text='user' icon={<UpVoiceIcon fill={theme.color.white} />} isActive={false} />
            <Margin mt={15}>
                <LinkWithIcon href={`/search/community?search=${search}`} text='community' icon={<DownVoiceIcon fill={theme.color.white} />} isActive={false} />
            </Margin>
            <Margin mt={15}>
                <LinkWithIcon href={`/search/publication?search=${search}`}text='publication' icon={<BookmarkIcon fill={theme.color.white} />} isActive={false} />
            </Margin>
        </NavigationSideBarStyled>
    )
}
