import styled from 'styled-components';


export const InputWrapper = styled.div`
  background: ${props => props.theme.color.grey};
  border-radius: 5px;
  padding: 15px;
  width: 360px;
  height: 32px;
  position: relative;
`;

export const InputLabelStyled = styled.label`
  color: #F5F5F5;
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
  font-size: 14px;
  transition: all 0.2s ease;
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-top: 12px;
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: ${props => props.theme.color.white};

  &:focus+${InputLabelStyled} , &:valid+${InputLabelStyled}{
    top: 15px;
    font-size: 14px;
  }
  &:focus+${InputLabelStyled}{
    color: ${props => props.theme.color.grean};
  }
  &:valid:not(:focus)+label{
    color: #F5F5F5;
  }
`;
