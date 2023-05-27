import React from "react";

import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import { MediaImageSlider } from "@entities/publication/ui/MediaImage";
import { MediaFile } from "@entities/publication/ui/MediaFile";
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
        <MediaImageSlider images={props.publication.publication_media} />
        <MediaFile files={props.publication.publication_media} />
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
