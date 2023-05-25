import React, { useState, useEffect } from "react";
import Image from "next/image";

import { imageLoader } from "@shared/lib";
import { UserAccauntStyled, DroppedMenu } from "./styled";
import { Flex, Margin, LinkWithIcon, DropDownSelect } from '@shared/ui';
import { useViewer } from "@entities/viewer";

import ArrowIcon from '@public/arrow.svg';
import AvatarImage from '@public/Avatar.png';
import LogoutIcon from '@public/logoutIcon.svg';
import SettingIcon from '@public/settingIcon.svg';
import ProfileIcon from '@public/ProfileIcon.svg';


export const ProfileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;
    const avatar = '/media/user/avatars/download.jpg'
   
    return (
      <UserAccauntStyled>
          <Flex alignItems="center" justifyContent="flex-start" onClick={() => setIsOpen((prev) => !prev)}>
            <Image loader={imageLoader}  src={avatar} alt={username} width={40} height={40} />
            <ArrowIcon transform={isOpen ? "rotate(0 0 0)" : "rotate(-90 0 0)"} />
          </Flex>
          <DroppedMenu isOpen={isOpen}>
            <Margin mt={15}>
              <LinkWithIcon href={`/user/${username}`} icon={<ProfileIcon />} text={username} isActive={false} />
            </Margin>
  
            <Margin mt={15}>
              <LinkWithIcon href="/settings" icon={<SettingIcon />} text="Settings" isActive={false} />
            </Margin>
  
            <Margin mt={30}>
              <DropDownSelect items={['Светлая тема', 'Темная тема']} />
              <DropDownSelect items={['Русский язык', 'Английский язык']} />
            </Margin>
  
            <Margin mt={30}>
              <LinkWithIcon href="/logout" icon={<LogoutIcon />} text="Logout" isActive={false} />
            </Margin>
          </DroppedMenu>
      </UserAccauntStyled>
    )
}
