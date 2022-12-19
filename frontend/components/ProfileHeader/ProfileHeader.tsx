import React from "react";
import Link from "next/link";

import { ProfileHeaderStyled, ProfileHeaderBackground, ProfileTitle, UserName } from "./style";
import UserTitle from "../UserTitle/UsetTitle";

import WrapperStyled from "../../styles/components/Wrapper"
import ContentGrid from "../../styles/components/ContentGrid";
import FlexStyled from "../../styles/components/Flex";
import Margin from "../../styles/components/Margin";


const ProfileHeader: React.FC = () => {
    return (
        <ProfileHeaderStyled>
            <ProfileHeaderBackground />
            <WrapperStyled>
                <ContentGrid>
                    <ProfileTitle>
                        <UserTitle />
                    </ProfileTitle>
                    <FlexStyled justifyContent="space-between" alignItems="flex-start">
                        <div>
                            <UserName>
                                SergeyAverin
                            </UserName>
                            <Link href="#">@sergeyaverin</Link>
                            <Margin mg="25px 0 0 0">
                                Описапние
                            </Margin>
                        </div>
                        <Margin mg="25px 0 0 0">
                            2 часа назад
                        </Margin>
                    </FlexStyled>
                </ContentGrid>
            </WrapperStyled>
        </ProfileHeaderStyled>        
    )
};

export default ProfileHeader;
