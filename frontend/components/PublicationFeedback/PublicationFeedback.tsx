import React from "react";
import Image from "next/image";

import FlexStyled from "../../styles/components/Flex";
import { TextAfterIcon } from "./styled";


interface PublicationFeedbackProps {
    icon: string,
    feedbackCount:number
}

const PublicationFeedback: React.FC<PublicationFeedbackProps> = ({icon, feedbackCount}) => {
    return (
        <FlexStyled justifyContent="flex-start" alignItems="center">
            <Image src={ icon } alt="up voice"/>
            <TextAfterIcon>{ feedbackCount }</TextAfterIcon>
        </FlexStyled>
    )
}

export default PublicationFeedback;
