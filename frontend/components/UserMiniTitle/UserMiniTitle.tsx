import React from "react";
import Image from "next/image";

import { UserMiniTitleStyled, UserName, UserInfo} from "./style";
import AvatarImage from "../../public/Avatar.png"
import { IUser } from "../../types/user";


interface IUserMiniTitleProps {
  user: IUser
}

const UserMiniTitle: React.FC<IUserMiniTitleProps> = ({ user }) => {
  return (
    <UserMiniTitleStyled>
      <Image
        src={AvatarImage}
        alt="Bavey"
        width={50}
        height={50}
      />
      <UserInfo>
        <UserName>{ user.username }</UserName>
        <a href={user.slug}>{user.slug}</a>
      </UserInfo>
    </UserMiniTitleStyled>
  )
};

export default UserMiniTitle;
