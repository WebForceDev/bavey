import React from "react";
import Image from "next/image";

import  { GroupHeaderBackgroundStyled, GroupHeaderStyled } from './styled';
import ButtonStyled from "../../styles/components/Button";
import WrapperStyled from "../../styles/components/Wrapper";
import FlexStyled from "../../styles/components/Flex";
import Margin from "../../styles/components/Margin";
import { ICommunity } from "../../types/user";
import { useIsCommunitySubscribeQuery, useSubscribeToCommunityMutation } from "../../redux/api/communityApi";

import Avatar from '../../public/Avatar.png';


interface IGroupHeaderProps {
    community: ICommunity
}

const GroupHeader: React.FC<IGroupHeaderProps> = ({ community }) => {
    const [ subscribeToCommunity ] = useSubscribeToCommunityMutation();
    const {isLoading, data} = useIsCommunitySubscribeQuery({slug: community.slug});

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
                                    <h1>{ community.name }</h1>
                                    <p>
                                        { community.description }
                                    </p>
                                </Margin>
                            </div>
                        </FlexStyled>
                        <FlexStyled justifyContent="flex-start" alignItems="flex-start">
                            <div>
                                { !isLoading && data.is_subscrive == false &&
                                    <Margin mg="0 0 10px 0">
                                        <ButtonStyled fill={false} onClick={() => subscribeToCommunity({slug: community.slug})}>Subscribe</ButtonStyled>
                                    </Margin>
                                }
                                { !isLoading && data.is_subscrive == true &&
                                    <Margin mg="0 0 10px 0">
                                        <ButtonStyled fill={true} onClick={() => subscribeToCommunity({slug: community.slug})}>Un subscribe</ButtonStyled>
                                    </Margin>
                                }
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
