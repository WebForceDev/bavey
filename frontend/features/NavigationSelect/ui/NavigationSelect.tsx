import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { NavigationBlockStyled, NavigationBlockTitleStyled } from './styled';
import { Flex, Margin, LinkWithIcon } from '@shared/ui';

import Arrow from "@public/arrow.svg";
import FriendsIcon from '@public/friends.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';
import CommunityIcon from '@public/communityIcon.svg';


export const NavigationSelect: React.FC = () => {
    const theme = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    //const navigationContext = useNavigation();

    return (
        <NavigationBlockStyled
            isOpen={isOpen}
            onClick={() => setIsOpen((prev)=>(!prev))}
        >

        <Flex alignItems='center' justifyContent='space-between' >
            <NavigationBlockTitleStyled>page</NavigationBlockTitleStyled>
            <Arrow  transform={isOpen ? "rotate(0 0 0)" : "rotate(-90 0 0)"}  />
        </Flex>
        
        { isOpen &&
            <>
                <Margin mt={20} mb={15}>
                    <LinkWithIcon isActive={false} text='Friends' href='/friends' icon={<FriendsIcon stroke={theme.color.white}  />} />
                </Margin>
                <Margin mb={15}>
                    <div>
                        <LinkWithIcon isActive={false} text='Subscriptions' href='/subscriptions' icon={<CommunityIcon fill={theme.color.white}  />} />
                    </div>
                </Margin>
                <Margin mb={15}>
                    <div>
                        <LinkWithIcon isActive={false} text='Saved' href='/saved/up' icon={<BookmarkIcon fill={theme.color.white}  />} />
                    </div>
                </Margin>
            </>
        }   
        </NavigationBlockStyled>
    )
};

