import React, { useState } from "react";

import { Flex } from "@shared/ui";
import { SetVoiceCountStyled } from "@features/SetVoicesButton/ui/styled";
import { useSetVoiceMutation } from "../api/voicesButtonApi";


interface ISetVoiceButtonProps {
    voiceCount: number,
    publicationSlug: string,
    iconDisable: React.ReactNode,
    iconEnable: React.ReactNode,
    voiceType: string,
    isEnableProps: boolean
}

export const SetVoiceButton: React.FC<ISetVoiceButtonProps> = ({ isEnableProps, voiceCount, iconDisable, iconEnable, publicationSlug, voiceType }) => {
    const [isEnable, setIsEnable] = useState(isEnableProps);
    const [ setVoice ] = useSetVoiceMutation();
    
    const clickHeandler = (event: React.MouseEvent) => {
        setIsEnable(prev => !prev);
        setVoice({ publicationSlug: publicationSlug, voiceType: voiceType });
    }

    return (
        <Flex justifyContent="center" alignItems="center" onClick={clickHeandler}>
            { isEnable ? iconEnable : iconDisable }
            <SetVoiceCountStyled isEnable={isEnable}>
                { voiceCount }
            </SetVoiceCountStyled>
        </Flex>
    )
}
