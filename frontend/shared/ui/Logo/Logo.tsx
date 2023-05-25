import React from "react";

import { LogoStyled, LogoTextStyled } from "./styled";
import BaveyLogo from "@public/baveyLogo.svg"


export const Logo: React.FC = () => {
  return (
    <LogoStyled>
      <BaveyLogo />
      <LogoTextStyled>
        Bavey
      </LogoTextStyled>
    </LogoStyled>
  )
};
