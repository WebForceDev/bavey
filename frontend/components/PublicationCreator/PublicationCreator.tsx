import React, { useState } from "react";
import Image from "next/image";

import { PublicationCreatorStyled, PublicationInput, PublicationButton } from "./style";
import Margin from "../../styles/components/Margin";
import FlexStyled from "../../styles/components/Flex";

import ImageSVG from "../../public/image.svg";


const PublicationCreator:React.FC = () => {
    const [inputValue, setInputValues] = useState('');

    return (
        <PublicationCreatorStyled>
            <PublicationInput
                placeholder="What’s Happening?"
                value={inputValue}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setInputValues(event.target.value)}
            />
            <Margin mg="15px 0 0 0">
                <FlexStyled alignItems="center" justifyContent="space-between" >
                    <Image src={ImageSVG} alt="Photo" />
                    <PublicationButton>Public</PublicationButton>
                </FlexStyled>
            </Margin>
        </PublicationCreatorStyled>
    )
};

export default PublicationCreator;
