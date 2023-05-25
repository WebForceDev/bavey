import React from "react";
import Link from "next/link";

import { IUser } from "../model/types";
import  { Margin } from "@shared/ui";
import { UserInfoStyled, UserInfoTagStyled, UserInfoTitleStyled } from "@entities/User/ui/styled";


interface IUserInfoProps {
    user: IUser
}

export const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
    return (
        <UserInfoStyled>
            <UserInfoTitleStyled>
                { user.first_name }
                &nbsp;
                { user.last_name }
            </UserInfoTitleStyled>
            <Link href={'/user/'+  user.username}>
                <UserInfoTagStyled>
                    { user.username }
                </UserInfoTagStyled>
            </Link>
            <Margin mt={15}>
                { user.description }
            </Margin>
        </UserInfoStyled>
    )
};
