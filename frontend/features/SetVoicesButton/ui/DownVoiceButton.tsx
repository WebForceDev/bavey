
import React from "react";

import { Flex } from "@shared/ui";

import DownVoiceIcon from '@public/downVoiceIcon.svg';


interface IDownVoiceProps {
    voiceCount: number,
    publicationSlug: string
}

export const DownVoice: React.FC<IDownVoiceProps> = ({ voiceCount }) => {
    return (
        <Flex justifyContent="center" alignItems="center">
            <DownVoiceIcon fill='red' />
            { voiceCount }
        </Flex>
    )
}
