import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { NavigationBlockStyled, NavigationBlockTitleStyled } from './style';
import FlexStyled from '../../styles/components/Flex';
import Margin from '../../styles/components/Margin';
import { useNavigation } from '../../providers/NavigationProviders';
import NavigationLink from '../NavigationLink/NavigationLink';

import Arrow from "../../public/arrow.svg";
import FriendsIcon from '../../public/friends.svg';
import BookmarkIcon from '../../public/bookmarkIcon.svg';
import CommunityIcon from '../../public/communityIcon.svg';


const NavigationBlock: React.FC = () => {
    const theme = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigationContext = useNavigation();

    return (
        <NavigationBlockStyled
            isOpen={isOpen}
            onClick={() => setIsOpen((prev)=>(!prev))}
        >

        <FlexStyled alignItems='center' justifyContent='space-between' >
            <NavigationBlockTitleStyled>{ navigationContext?.activePage }</NavigationBlockTitleStyled>
            <Arrow />
        </FlexStyled>
        
        { isOpen &&
            <>
                <Margin mg='20px 0 15px 0'>
                    <NavigationLink text='Friends' href='/friends' icon={<FriendsIcon stroke={theme.color.white}  />} />
                </Margin>
                <Margin mg='0 0 15px 0'>
                    <div>
                        <NavigationLink text='Subscriptions' href='/subscriptions' icon={<CommunityIcon fill={theme.color.white}  />} />
                    </div>
                </Margin>
                <Margin mg='0 0 15px 0'>
                    <div>
                        <NavigationLink text='Saved' href='/saved/up' icon={<BookmarkIcon fill={theme.color.white}  />} />
                    </div>
                </Margin>
            </>
        }   
        </NavigationBlockStyled>
    )
};

export default NavigationBlock;
