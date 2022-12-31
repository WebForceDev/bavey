import React from "react";

import { BoardStyled, BoardTitleStyled } from "./style";


interface IBoard {
  children: any
}

const Board: React.FC<IBoard> = (props) => {
  return (
    <BoardStyled>
        <BoardTitleStyled>Title</BoardTitleStyled>
        { props.children }
    </BoardStyled>
  )
};

export default Board;
