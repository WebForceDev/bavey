import React from "react";
import Image from "next/image";
import Link from "next/link";

import { UserMiniTitleStyled, UserName, UserInfo} from "./style";
import AvatarImage from "../../public/Avatar.png"
import { IUserMini } from "../../types/user";


interface IUserMiniTitleProps {
  autor: IUserMini
}

const UserMiniTitle: React.FC<IUserMiniTitleProps> = ({ autor }) => {
  return (
    <UserMiniTitleStyled>
      <Image
        src={AvatarImage}
        alt="Bavey"
        width={50}
        height={50}
      />
      <UserInfo>
        <Link href={ autor.slug }>
          { autor.username }
        </Link>
      </UserInfo>
    </UserMiniTitleStyled>
  )
};

export default UserMiniTitle;
