import React from "react"

import Header from "../Header/Header"
import WrapperStyled from "../../styles/components/Wrapper"


interface IBaseLayoutProps {
    children: any
}

const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <main>
        <WrapperStyled>
          {props.children}
        </WrapperStyled>
      </main>
    </>
  )
};
  

export default BaseLayout;
