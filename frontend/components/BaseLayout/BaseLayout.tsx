import React from "react"

import Header from "../Header/Header"


interface IBaseLayoutProps {
    children: any
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
          { children }
      </main>
    </>
  )
};
  

export default BaseLayout;
