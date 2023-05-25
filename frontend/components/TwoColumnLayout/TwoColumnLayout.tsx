import React  from "react";

import { TwoColumnLayoutStyled } from './style';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import WrapperStyled from "../../styles/components/Wrapper";


interface ITwoColumnLayoutProps {
    children: any
}

const TwoColumnLayout:React.FC<ITwoColumnLayoutProps> = ({children}) => {
    return (
        <BaseLayout>
            <WrapperStyled>
                <TwoColumnLayoutStyled>
                    { children }
                </TwoColumnLayoutStyled>
            </WrapperStyled>
        </BaseLayout>
    )
};

export default TwoColumnLayout;
