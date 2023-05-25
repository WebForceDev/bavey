import React  from "react";

import { ThreeColumnLayoutStyled } from './styled';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import WrapperStyled from "../../styles/components/Wrapper";


interface ITreeColumnLayoutProps {
    children: any
}

const ThreeColumnLayout:React.FC<ITreeColumnLayoutProps> = ({children}) => {
    return (
        <BaseLayout>
            <WrapperStyled>
                <ThreeColumnLayoutStyled>
                    { children }
                </ThreeColumnLayoutStyled>
            </WrapperStyled>
        </BaseLayout>
    )
};

export default ThreeColumnLayout;
