import React, {useState} from "react";

import { InputWrapper, InputStyled, InputLabelStyled } from "./style";


interface IInputProps {
  attrName: string,
  attrType?: string,
  labelText: string,
  inputValues: string,
  setInputValues: Function
};

const Input: React.FC<IInputProps> = ({attrName, labelText, attrType, inputValues, setInputValues}) => {
  return (
    <InputWrapper>
      <InputStyled
        name={attrName}
        required
        value={inputValues}
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setInputValues(event.target.value)}
        type={attrType}/>
      <InputLabelStyled htmlFor={attrName} >{labelText}</InputLabelStyled>
    </InputWrapper>
  )
};

Input.defaultProps = {
  attrType: 'text'
};

export default Input;
