import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { NavigationBlockStyled, NavigationBlockTitleStyled } from './style';
import FlexStyled from '../../styles/components/Flex';
import Margin from '../../styles/components/Margin';
import { useNavigation } from '../../providers/NavigationProviders';

import Arrow from "../../public/arrow.svg";


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
                <Margin mg='10px 0 0 0'>
                        <div>
                            <Link href='/friends'>friends</Link>
                        </div>
                    </Margin>
                    <Margin mg='10px 0 0 0'>
                    <div>
                        <Link href='/saved/upvoice'>saved post</Link>
                    </div>
                </Margin>
            </>
        }   
        </NavigationBlockStyled>
    )
};

export default NavigationBlock;
