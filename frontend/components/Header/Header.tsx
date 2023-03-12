import React from "react";

import Logo from '../Logo/Logo';
import HeaderStyled from "./style";
import WrapperStyled from "../../styles/components/Wrapper";
import NavigationBlock from "../NavigationBlock/NavigationBlock";
import UserAccaunt from "../UserAccaunt/UserAccaunt";
import FlexStyled from "../../styles/components/Flex";
import Margin from "../../styles/components/Margin";


const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <WrapperStyled>
        <FlexStyled alignItems="center" justifyContent="space-between">
          <FlexStyled alignItems="center" justifyContent="flex-start">
            <Logo />
            <Margin mg="0 0 0 15px">
              <NavigationBlock />
            </Margin>
          </FlexStyled>
          <UserAccaunt />
        </FlexStyled>
      </WrapperStyled>
    </HeaderStyled>
  )
};

export default Header;
