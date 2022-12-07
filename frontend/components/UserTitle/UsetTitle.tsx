import React from "react";
import Image from "next/image";

import {UserTitleStyled} from './style';
import Button from '../../styles/components/Button';
import AvatarImage from "../../public/Avatar.png";


const UserTitle: React.FC = () => {
  return (
    <UserTitleStyled>
        <Image
          src={AvatarImage}
          alt="Bavey"
          width={189}
          height={189}
        />
        <Button fill>Send message</Button>
        <Button>Subscribe</Button>
    </UserTitleStyled>
  )
};

export default UserTitle;
