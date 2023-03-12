import styled, { css } from "styled-components";


export const SettingsPanelStyled = styled.div`
    background: ${props => props.theme.color.grey};
    border-radius: 30px;
    min-height: 450px;
    overflow-y: auto;
    display: flex;
`;

export const SettingsNavigationStyled = styled.div`
    margin-left: 30px;
    min-height: 450px;
    border-right: 2px solid ${props => props.theme.color.white};
    padding-right: 100px;
`;

export const SettingsNavigationLinksStyled = styled.div`
    padding-top: 30px;
`;

interface ISettingsNavigationLinkProps {
    isActive: boolean
}

export const SettingsNavigationLink = styled.div<ISettingsNavigationLinkProps>`
    color: ${props => props.theme.color.white};
    border-left: 3px solid ${props => props.theme.color.grean};
    font-weight: 300;       
    padding: 4px 15px;
    display: block;
    margin-top: 14px;
    width: 80px;
    transition: .2s;
    cursor: pointer;

    ${(props) => props.isActive && css`
        transition: .2s;
        background: ${props => props.theme.color.grean};
        color: ${props => props.theme.color.black};
    `}
`;

export const SettingsInput = styled.input`
    background: none;
    border: none;
    color: ${props => props.theme.color.white}; 
    outline: none;
    border-bottom: 2px solid ${props => props.theme.color.white};
    margin-top: 8px;
    width: 300px;
    font-family: 'Poppins', sans-serif;
`;

export const SettingsLabel = styled.label`
    color: ${props => props.theme.color.white}; 
    font-size: 16px;
    display: block;
    font-family: 'Poppins', sans-serif;
    margin-top: 30px;
`;

export const SettingsTextarea = styled.textarea`
    background: none;
    border: none;
    color: ${props => props.theme.color.white}; 
    outline: none;
    border: 1px solid ${props => props.theme.color.white};
    margin-top: 8px;
    border-radius: 8px;
    width: 300px;
    padding: 8px;
`;
