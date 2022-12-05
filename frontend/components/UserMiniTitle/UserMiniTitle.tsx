import React from "react";
import Image from "next/image";

import { UserMiniTitleStyled, UserName, UserInfo} from "./style";
import AvatarImage from "../../public/Avatar.png"


const Header: React.FC = () => {
  return (
    <UserMiniTitleStyled>
      <Image
        src={AvatarImage}
        alt="Bavey"
        width={60}
        height={60}
      />
      <UserInfo>
        <UserName>Sergey Averin</UserName>
        <a href="#">@sergeyaverin</a>
      </UserInfo>
    </UserMiniTitleStyled>
  )
};

export default Header;
