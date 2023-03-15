import React from "react";
import Image from "next/image";

import  { GroupHeaderBackgroundStyled, GroupHeaderStyled, SubscribersStyled } from './styled';
import ButtonStyled from "../../styles/components/Button";
import WrapperStyled from "../../styles/components/Wrapper";
import FlexStyled from "../../styles/components/Flex";
import Margin from "../../styles/components/Margin";

import Avatar from '../../public/Avatar.png';


const GroupHeader: React.FC = () => {
    return (
        <>
            <GroupHeaderBackgroundStyled></GroupHeaderBackgroundStyled>
            <GroupHeaderStyled>
                <WrapperStyled>
                    <FlexStyled justifyContent="space-between" alignItems="center">
                        <FlexStyled justifyContent="flex-start" alignItems="center">
                            <Image src={Avatar} alt='group' />
                            <div>
                                <Margin mg="0 0 0 30px">
                                    <h1>Group name</h1>
                                    <p>
                                        description
                                    </p>
                                </Margin>
                            </div>
                        </FlexStyled>
                        <FlexStyled justifyContent="flex-start" alignItems="flex-start">
                            <SubscribersStyled>
                                2000 подписчиков
                            </SubscribersStyled>
                            <div>
                                <Margin mg="0 0 10px 0">
                                    <ButtonStyled>Subscribe</ButtonStyled>
                                </Margin>
                                <Margin mg="15px 0 0 0">
                                    <ButtonStyled>Recommend</ButtonStyled>
                                </Margin>
                            </div>
                        </FlexStyled>
                    </FlexStyled>
                </WrapperStyled>
            </GroupHeaderStyled>
        </>
    )
};

export default GroupHeader;
