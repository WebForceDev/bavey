import React, { useState } from "react";
import Image from "next/image";

import { PublicationCreatorStyled, PublicationInput, AddImage, PublicationButton } from "./styled";
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
    const [image, setImage] = useState(new Blob());
    const [createPublication] = useCreatePublicationMutation();

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (inputValue != '') {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', inputValue);
            createPublication({wallSlug: wallSlug, wallType: wallType, body: formData});

            setInputValues('');
            setImage(new Blob());
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
                    <AddImage multiple={true} accept="image/*"  onChange={(event) => setImage(event.target.files[0])} />
                    <PublicationButton value="Public" />
                </Flex>
            </Margin>
        </PublicationCreatorStyled>
    )
};
