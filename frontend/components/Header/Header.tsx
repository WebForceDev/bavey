import React from "react";

import Logo from '../Logo/Logo';
import HeaderStyled from "./style";
import WrapperStyled from "../../styles/components/Wrapper";


const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <WrapperStyled>
        <Logo />
      </WrapperStyled>
    </HeaderStyled>
  )
};

export default Header;
