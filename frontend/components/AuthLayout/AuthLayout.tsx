import React from "react"
import Image from "next/image";

import { AuthFormStyled, AuthLayoutStyled, FormTitle, SubmitStyled } from './style';

import BaveyLogo from "../../public/baveyLogo.svg"


interface IAuthLayoutProps {
    children: any
}

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
  return (
    <AuthLayoutStyled>
      <Image src={BaveyLogo} alt="Bavey" width={150} height={150} />
      <FormTitle>Sign in to Bevyes</FormTitle>
      <AuthFormStyled>
        {props.children}
        <SubmitStyled value='Sign in'/>
      </AuthFormStyled>
    </AuthLayoutStyled>
  )
};
  

export default AuthLayout;
