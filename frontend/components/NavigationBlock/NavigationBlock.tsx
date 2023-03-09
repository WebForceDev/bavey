import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { NavigationBlockStyled, NavigationBlockTitleStyled } from './style';
import FlexStyled from '../../styles/components/Flex';
import Margin from '../../styles/components/Margin';
import { useNavigation } from '../../providers/NavigationProviders';
import NavigationLink from '../NavigationLink/NavigationLink';

import Arrow from "../../public/arrow.svg";
import FriendsIcon from '../../public/friends.svg';
import BookmarkIcon from '../../public/bookmarkIcon.svg';


const NavigationBlock: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigationContext = useNavigation();

    return (
        <NavigationBlockStyled
            isOpen={isOpen}
            onClick={() => setIsOpen((prev)=>(!prev))}
        >

        <FlexStyled alignItems='center' justifyContent='space-between' >
            <NavigationBlockTitleStyled>{ navigationContext?.activePage }</NavigationBlockTitleStyled>
            <Image src={Arrow} alt="arrow" />
        </FlexStyled>
        
        { isOpen &&
            <>
                <Margin mg='20px 0 15px 0'>
                    <NavigationLink text='Friends' href='/friends' alt='friends' icon={FriendsIcon} />
                </Margin>
                <Margin mg='0 0 15px 0'>
                    <div>
                        <NavigationLink text='Saved' href='/saved/up' alt='saved' icon={BookmarkIcon} />
                    </div>
                </Margin>
            </>
        }   
        </NavigationBlockStyled>
    )
};

export default NavigationBlock;
