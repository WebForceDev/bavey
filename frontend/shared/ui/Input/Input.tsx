import React, {useRef, useState} from "react";

import { InputWrapper, InputStyled, InputLabelStyled } from "./styled";


interface IInputProps {
  attrName: string,
  attrType?: string,
  labelText: string,
  inputValues: string,
  setInputValues: Function
};

export const Input: React.FC<IInputProps> = ({attrName, labelText, attrType, inputValues, setInputValues}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fucusOnInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  return (
    <InputWrapper>
      <InputStyled
        ref={inputRef}
        name={attrName}
        required
        value={inputValues}
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setInputValues(event.target.value)}
        type={attrType}/>
      <InputLabelStyled htmlFor={attrName} onClick={fucusOnInput}>{labelText}</InputLabelStyled>
    </InputWrapper>
  )
};

Input.defaultProps = {
  attrType: 'text'
};

