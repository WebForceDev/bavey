import React from "react";

import FlexStyled from "../../styles/components/Flex";
import { TextAfterIcon } from "./styled";


interface PublicationFeedbackProps {
    icon: any,
    feedbackCount:any,
    onclick:any,
    isAcrive: boolean
}

const PublicationFeedback: React.FC<PublicationFeedbackProps> = ({icon, feedbackCount, onclick, isAcrive}) => {
    return (
        <FlexStyled justifyContent="flex-start" alignItems="center" onClick={onclick}>
            { icon }
            <TextAfterIcon isAcrive={isAcrive} >{ feedbackCount }</TextAfterIcon>
        </FlexStyled>
    )
}

export default PublicationFeedback;
