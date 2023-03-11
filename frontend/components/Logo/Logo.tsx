import React from "react";

import LogoStyled from "./style";
import BaveyLogo from "../../public/baveyLogo.svg"


const Header: React.FC = () => {
  return (
    <LogoStyled>
      <BaveyLogo />
      Bavey
    </LogoStyled>
  )
};

export default Header;
