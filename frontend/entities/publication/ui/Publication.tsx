import React from "react";

import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import { IPublication } from '../model/types';
import { Flex } from "@shared/ui";
import { Margin } from "@shared/ui";



interface IPublicationProps {
  publication: IPublication
  publicationHeader: React.ReactNode,
  upVoiceButtonSlot: React.ReactNode,
  downVoiceButtonSlot: React.ReactNode,
  bookmarkVoiceButtonSlot: React.ReactNode,
}

export const Publication: React.FC<IPublicationProps> = (props) => {
  return (
    <PublicationStyle>
        <PublicationWrapper>
            { props.publicationHeader }
        </PublicationWrapper>
        <PublicationText>
          { props.publication.publication.title }
        </PublicationText>
        <PublicationWrapper>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex justifyContent="flex-start" alignItems="center">
            { props.upVoiceButtonSlot }
            <Margin ml={15}>
              { props.downVoiceButtonSlot }              
            </Margin>
          </Flex>
          { props.bookmarkVoiceButtonSlot }
        </Flex>
        </PublicationWrapper>
    </PublicationStyle>
  )
};
