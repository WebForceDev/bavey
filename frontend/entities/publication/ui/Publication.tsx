import React from "react";

import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import { IPublication } from '../model/types';



interface IPublicationProps {
  publication: IPublication
  publicationHeader: React.ReactNode
}

export const Publication: React.FC<IPublicationProps> = ({publication, publicationHeader}) => {
  return (
    <PublicationStyle>
        <PublicationWrapper>
            { publicationHeader }
        </PublicationWrapper>
        <PublicationText>
          { publication.publication.title }
        </PublicationText>
        <PublicationWrapper>
            лайки
        </PublicationWrapper>
    </PublicationStyle>
  )
};
