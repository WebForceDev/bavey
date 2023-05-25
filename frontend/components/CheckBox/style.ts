import styled from "styled-components";


export const CheckBoxStyled = styled.input.attrs({ type: 'checkbox' })`
    margin-right: 8px;
    accent-color: ${props => props.theme.color.grean};
    width: 18px;
    height: 18px;
`;

export const LableStyled = styled.label`
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
`;

export const CheckBoxWrapper = styled.label`
  display: flex;
  align-items: center;
`;
