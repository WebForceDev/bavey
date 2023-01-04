import React, {useState} from "react";

import { InputWrapper, InputStyled, InputLabelStyled } from "./style";


interface IInputProps {
  attrName: string,
  attrType?: string,
  labelText: string
};

const Input: React.FC<IInputProps> = ({attrName, labelText, attrType}) => {
  const [inputValues, setInputValues] = useState('');

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
