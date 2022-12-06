import React from "react";
import Image from "next/image";

import { UserMiniTitleStyled, UserName, UserInfo} from "./style";
import AvatarImage from "../../public/Avatar.png"


const UserMiniTitle: React.FC = () => {
  return (
    <UserMiniTitleStyled>
      <Image
        src={AvatarImage}
        alt="Bavey"
        width={50}
        height={50}
      />
      <UserInfo>
        <UserName>Sergey Averin</UserName>
        <a href="#">@sergeyaverin</a>
      </UserInfo>
    </UserMiniTitleStyled>
  )
};

export default UserMiniTitle;
