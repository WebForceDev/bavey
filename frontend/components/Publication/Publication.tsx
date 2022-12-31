import React from "react";
import Image from "next/image";

import UserMiniTitle from "../UserMiniTitle/UserMiniTitle";
import FlexStyled from "../../styles/components/Flex";
import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import PublicationFeedback from "../PublicationFeedback/PublicationFeedback";
import Margin from "../../styles/components/Margin";
import { IPublication, IUser } from "../../types/user";

import upVoiceIcon from '../../public/upVoiceIcon.svg';
import downVoiceIcon from '../../public/downVoiceIcon.svg';
import commentIcon from '../../public/commentIcon.svg';
import bookmarkIcon from '../../public/bookmarkIcon.svg';


interface IPublicationProps {
  user: IUser,
  publication: IPublication
}

const Publication: React.FC<IPublicationProps> = ({user, publication}) => {
  return (
    <PublicationStyle>
        <PublicationWrapper>
            <UserMiniTitle user={ user } />
        </PublicationWrapper>
        <PublicationText>
          { publication.title }
        </PublicationText>
        <PublicationWrapper>
          <Margin mg="10px 0 0 0">
            <FlexStyled justifyContent="space-between" alignItems="center">
              <FlexStyled justifyContent="flex-start" alignItems="center">
                <Margin mg="0 15px 0 0">
                    <PublicationFeedback icon={upVoiceIcon} feedbackCount={ publication.up_voice.length } />
                </Margin>
                <Margin mg="0 15px 0 0">
                    <PublicationFeedback icon={downVoiceIcon} feedbackCount={ publication.down_voice.length } />
                </Margin>
                <Margin mg="0 15px 0 0">
                    <PublicationFeedback icon={commentIcon} feedbackCount={21} />
                </Margin>
              </FlexStyled>
              <Image src={bookmarkIcon} alt="bookmark"/>
            </FlexStyled>
          </Margin>
        </PublicationWrapper>
    </PublicationStyle>
  )
};

export default Publication;
