import React from "react";
import Image from "next/image";

import LogoStyled from "./style";
import BaveyLogo from "../../public/baveyLogo.svg"


const Header: React.FC = () => {
  return (
    <LogoStyled>
      <Image src={BaveyLogo} alt="Bavey"/>
      Bavey
    </LogoStyled>
  )
};

export default Header;
