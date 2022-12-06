import React from "react";
import Image from "next/image";

import UserMiniTitle from "../UserMiniTitle/UserMiniTitle";
import FlexStyled from "../../styles/components/Flex";
import { PublicationStyle, PublicationWrapper, PublicationText, TextAfterIcon } from "./styled";

import upVoiceIcon from '../../public/upVoiceIcon.svg';
import downVoiceIcon from '../../public/downVoiceIcon.svg';
import commentIcon from '../../public/commentIcon.svg';
import bookmarkIcon from '../../public/bookmarkIcon.svg';


const Publication: React.FC = () => {
  return (
    <PublicationStyle>
        <PublicationWrapper>
            <UserMiniTitle />
        </PublicationWrapper>
        <PublicationText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis sodales elit, in dignissim turpis. Donec rutrum vehicula leo eget ullamcorper. Aliquam in dui porta, fringilla diam sed, suscipit elit. Quisque pulvinar risus purus, vel tincidunt enim lobortis et. Suspendisse non bibendum libero. Duis mattis neque nec dui pretium, a eleifend ipsum egestas. Aenean sed metus sed mi sollicitudin tempor. Maecenas porttitor tempus lorem, eget luctus turpis ultricies commodo. Curabitur sit amet justo nibh. Curabitur leo turpis, sodales nec nibh in, blandit iaculis odio. Nullam eros tortor, vehicula vel lorem a, dictum lacinia eros. Vestibulum consequat, orci ac bibendum vehicula, massa orci imperdiet risus, eget laoreet est turpis quis ipsum. Vestibulum scelerisque nisi justo, a sodales turpis molestie non. Vestibulum pellentesque arcu sem, vel convallis arcu hendrerit non. In laoreet fringilla ipsum condimentum ultrices. Fusce facilisis porttitor libero.
        </PublicationText>
        <PublicationWrapper>
          <FlexStyled justifyContent="space-between" alignItems="center">
            <FlexStyled justifyContent="flex-start" alignItems="center">
              <Image src={upVoiceIcon} alt="up voice"/>
              <TextAfterIcon>21</TextAfterIcon>
              <Image src={downVoiceIcon} alt="down voice"/>
              <TextAfterIcon>21</TextAfterIcon>
              <Image src={commentIcon} alt="comment"/>
              <TextAfterIcon>21</TextAfterIcon>
            </FlexStyled>
            <Image src={bookmarkIcon} alt="bookmark"/>
          </FlexStyled>
        </PublicationWrapper>
    </PublicationStyle>
  )
};

export default Publication;
