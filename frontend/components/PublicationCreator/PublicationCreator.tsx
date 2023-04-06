import React, { useState } from "react";
import Image from "next/image";

import { PublicationCreatorStyled, PublicationInput, PublicationButton } from "./style";
import Margin from "../../styles/components/Margin";
import FlexStyled from "../../styles/components/Flex";
import { useCreatePublicationMutation } from "../../redux/api/postApi";
import { IPublication } from "../../types/user";

import ImageSVG from "../../public/image.svg";


interface IPublicationCreatorProps {
    setPublicationList: Function,
    wall: string,
    wall_type: string,
}

const PublicationCreator:React.FC<IPublicationCreatorProps> = ({wall, setPublicationList, wall_type}) => {
    const [inputValue, setInputValues] = useState('');
    const [createPublication, result] = useCreatePublicationMutation();

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (inputValue != '') {
            const req = createPublication({
                title: inputValue,
                wall,
                wall_type
            });
            const data = await req;
            
            setPublicationList((prevState) => {
                setInputValues('');
                return [data.data, ...prevState]
            });
            
        }
    };

    return (
        <PublicationCreatorStyled onSubmit={submitHandler}>
            <PublicationInput
                placeholder="What’s Happening?"
                value={inputValue}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setInputValues(event.target.value)}
            />
            <Margin mg="15px 0 0 0">
                <FlexStyled alignItems="center" justifyContent="space-between" >
                    <ImageSVG />
                    <PublicationButton value="Public" />
                </FlexStyled>
            </Margin>
        </PublicationCreatorStyled>
    )
};

export default PublicationCreator;
