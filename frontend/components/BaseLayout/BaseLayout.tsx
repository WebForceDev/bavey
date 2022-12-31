import React from "react"

import Header from "../Header/Header"


interface IBaseLayoutProps {
    children: any
}

const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <main>
          {props.children}
      </main>
    </>
  )
};
  

export default BaseLayout;
