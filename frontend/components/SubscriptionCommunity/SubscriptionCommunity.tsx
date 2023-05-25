import React from "react";
import Image from "next/image";
import Link from "next/link";

import { SubscriptionCommunityStyled, SubscriptionCommunityTitleStyled, SubscriptionCommunityDescriptionStyled } from "./styled";
import { ICommunity } from "../../types/user";
import ButtonStyled from "../../styles/components/Button";
import FlexStyled from "../../styles/components/Flex";
import Margin from "../../styles/components/Margin";
import { useSubscribeToCommunityMutation } from "../../redux/api/communityApi";

import Avatar from "../../public/Avatar.png";


interface ISubscriptionCommunityProps {
    community: ICommunity
}

const SubscriptionCommunity:React.FC<ISubscriptionCommunityProps> = ({ community }) => {
    const [ unsubscribe ] = useSubscribeToCommunityMutation();

    return (
        <SubscriptionCommunityStyled>
            <FlexStyled alignItems="center" justifyContent="flex-start">
                <Image width={80} height={80} src={Avatar} alt='' />

                <Margin mg="0 0 0 15px">
                    <SubscriptionCommunityTitleStyled>
                        <Link href={`/community/${community.slug}`}>
                            { community.name }
                        </Link>
                        <Margin mg="8px 0 0 0">
                            <SubscriptionCommunityDescriptionStyled>
                                { community.description }
                            </SubscriptionCommunityDescriptionStyled>
                        </Margin>
                    </SubscriptionCommunityTitleStyled>
                </Margin>

            </FlexStyled>
            
            <ButtonStyled onClick={() => unsubscribe({slug: community.slug})}>Unsubscribe</ButtonStyled>
        </SubscriptionCommunityStyled>  
    )
};

export default SubscriptionCommunity;
