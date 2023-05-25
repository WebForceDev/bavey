import React, { useState } from "react";
import Image from "next/image";

import { PublicationCreatorStyled, PublicationInput, PublicationButton } from "./styled";
import { Flex, Margin } from "@shared/ui";
import { IPublication } from "@entities/publication";
import { useCreatePublicationMutation } from "../api/createPublicationApi";

import ImageSVG from "@public/image.svg";


interface ICreatePublicationProps {
    wallSlug: string,
    wallType: string,
}

export const CreatePublication:React.FC<ICreatePublicationProps> = ({wallSlug, wallType}) => {
    const [inputValue, setInputValues] = useState('');
    const [createPublication] = useCreatePublicationMutation();

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (inputValue != '') {
            createPublication({wallSlug: wallSlug, wallType: wallType, title: inputValue});
            setInputValues('');
        }
    };

    return (
        <PublicationCreatorStyled onSubmit={submitHandler}>
            <PublicationInput
                placeholder="What’s Happening?"
                value={inputValue}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setInputValues(event.target.value)}
            />
            <Margin mt={15}>
                <Flex alignItems="center" justifyContent="space-between" >
                    <ImageSVG />
                    <PublicationButton value="Public" />
                </Flex>
            </Margin>
        </PublicationCreatorStyled>
    )
};
