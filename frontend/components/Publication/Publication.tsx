import React, { useState, useContext } from "react";
import { ThemeContext } from 'styled-components';

import UserMiniTitle from "../UserMiniTitle/UserMiniTitle";
import FlexStyled from "../../styles/components/Flex";
import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import PublicationFeedback from "../PublicationFeedback/PublicationFeedback";
import Margin from "../../styles/components/Margin";
import { IPublication, IUser, IUserMini } from "../../types/user";
import { useSetVoiceMutation } from "../../redux/api/postApi";

import UpVoiceIcon from '../../public/upVoiceIcon.svg';
import DownVoiceIcon from '../../public/downVoiceIcon.svg';
import CommentIcon from '../../public/commentIcon.svg';
import BookmarkIcon from '../../public/bookmarkIcon.svg';


interface IPublicationProps {
  publication: IPublication
}

const Publication: React.FC<IPublicationProps> = ({publication}) => {
  const theme = useContext(ThemeContext)
  const [setVoice] = useSetVoiceMutation();
  const [upVoices, setUpVoices]= useState(publication.up_voice.length);
  const [downVoices, setDownVoices] = useState(publication.down_voice.length);
  
  function setUpvoice(voice:string):React.MouseEventHandler<HTMLDivElement> {
    return async (event) => {
      const mutation = setVoice({slug: publication.slug, voiceType: voice})
      const res:any = await mutation;

      setUpVoices(res.data.up_voice_count);
      setDownVoices(res.data.down_voice_count);
    }
  }
  return (
    <PublicationStyle>
        <PublicationWrapper>
            <UserMiniTitle autor={ publication.autor } />
        </PublicationWrapper>
        <PublicationText>
          { publication.title }
        </PublicationText>
        <PublicationWrapper>
          <Margin mg="10px 0 0 0">
            <FlexStyled justifyContent="space-between" alignItems="center">
              <FlexStyled justifyContent="flex-start" alignItems="center">
                <Margin mg="0 15px 0 0">
                    <PublicationFeedback
                      onclick={setUpvoice('up')}
                      icon={<UpVoiceIcon fill={theme.color.white} />}
                      isAcrive={false}
                      feedbackCount={ upVoices } />
                </Margin>
                <Margin mg="0 15px 0 0">
                    <PublicationFeedback
                      onclick={setUpvoice('down')}
                      icon={<DownVoiceIcon fill={theme.color.white} />}
                      isAcrive={false}
                      feedbackCount={ downVoices } />
                </Margin>
                <Margin mg="0 15px 0 0">
                    <PublicationFeedback
                      onclick={setUpvoice('bookmark')}
                      icon={<CommentIcon fill={theme.color.white} />}
                      isAcrive={false}
                      feedbackCount={21} />
                </Margin>
              </FlexStyled>
              <BookmarkIcon onClick={() => setUpvoice('bookmark')()} fill={theme.color.white} />
            </FlexStyled>
          </Margin>
        </PublicationWrapper>
    </PublicationStyle>
  )
};

export default Publication;
