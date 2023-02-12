import React, { useState } from "react";

import { CheckBoxStyled, LableStyled, CheckBoxWrapper } from "./style";


interface ICheckBoxProps {
    text: string
}

const CheckBox: React.FC<ICheckBoxProps> = ({ text }) => {
  const [checkBoxValues, setCheckBoxValues] = useState(false);

  return (
    <CheckBoxWrapper>
      <CheckBoxStyled
        checked={checkBoxValues}
        onChange={() => setCheckBoxValues((prevState) => !prevState)} />
      <LableStyled>{ text }</LableStyled>
    </CheckBoxWrapper>
  )
};


export default CheckBox;
