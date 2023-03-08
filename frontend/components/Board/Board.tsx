import React from "react";
import Link from "next/link";

import { BoardStyled, BoardTitleStyled } from "./style";


interface IBoard {
  title: string,
  children: any,
  href?: string
}

const Board: React.FC<IBoard> = ({ title, children, href }) => {
  return (
    <BoardStyled>
        {href ?
          <Link href={href}>
            <BoardTitleStyled>
              {title}
            </BoardTitleStyled>
          </Link>
          :
          <BoardTitleStyled>{title}</BoardTitleStyled>
        }
        { children }
    </BoardStyled>
  )
};

export default Board;
