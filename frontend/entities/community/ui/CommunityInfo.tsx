import React from "react";
import Image from "next/image";

import { ICommunity } from "../model/types";
import { CommunityInfoStyled, CommunityInfoTitleStyled } from "./styled";
import { Margin } from "@shared/ui";

import Avatar from "@public/Avatar.png"


interface ICommunityInfo {
    community: ICommunity
}

export const CommunityInfo: React.FC<ICommunityInfo>  = ({ community }) => {
    return (
        <CommunityInfoStyled>
            <Image src={Avatar} alt={ community.title } />
            <Margin ml={20}>
                <CommunityInfoTitleStyled>
                    { community.title }
                </CommunityInfoTitleStyled>
                { community.description }
            </Margin>
        </CommunityInfoStyled>
    )
}
