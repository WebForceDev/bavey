import React from "react";
import Link from "next/link";

import { ProfileHeaderStyled, ProfileHeaderBackground, ProfileTitle, UserName } from "./style";
import UserTitle from "../UserTitle/UsetTitle";

import WrapperStyled from "../../styles/components/Wrapper"
import ContentGrid from "../../styles/components/ContentGrid";
import FlexStyled from "../../styles/components/Flex";
import Margin from "../../styles/components/Margin";
import { IUser } from "../../types/user";


interface IProfileHeaderProps {
    user: IUser
}

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ user }) => {
    return (
        <ProfileHeaderStyled>
            <ProfileHeaderBackground />
            <WrapperStyled>
                <ContentGrid>
                    <ProfileTitle>
                        <UserTitle user={user} />
                    </ProfileTitle>
                    <FlexStyled justifyContent="space-between" alignItems="flex-start">
                        <div>
                            <UserName>
                                { user.username }
                            </UserName>
                            <Link href={ user.slug }>{ user.slug }</Link>
                            <Margin mg="25px 0 0 0">
                                { user.description }
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
