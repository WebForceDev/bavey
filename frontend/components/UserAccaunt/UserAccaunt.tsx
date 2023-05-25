import React, { useState, useEffect } from "react";
import Image from "next/image";

import { UserAccauntStyled, DroppedMenu } from "./styled";
import ToggleList from "../ToggleList/ToggleList";
import NavigationLink from "../NavigationLink/NavigationLink";
import Margin from "../../styles/components/Margin";
import FlexStyled from "../../styles/components/Flex";
import { useAuth } from "../../providers/AuthProviders";

import ArrowIcon from '../../public/arrow.svg';
import AvatarImage from '../../public/Avatar.png';
import LogoutIcon from '../../public/logoutIcon.svg';
import SettingIcon from '../../public/settingIcon.svg';
import ProfileIcon from '../../public/ProfileIcon.svg';


const UserAccaunt: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const authContext = useAuth();
  useEffect(() => {
    setUsername(String(authContext?.authUser.username));
  }, []);

  return (
    <UserAccauntStyled>
        <FlexStyled alignItems="center" justifyContent="flex-start" onClick={() => setIsOpen((prev) => !prev)}>
          <Image src={AvatarImage} alt='username' width={40} height={40} />
          <ArrowIcon transform={isOpen ? "rotate(0 0 0)" : "rotate(-90 0 0)"} />
        </FlexStyled>
        <DroppedMenu isOpen={isOpen}>
          <Margin mg="15px 0 0 0">
            <NavigationLink href="/profile" icon={<ProfileIcon />} text={username} />
          </Margin>

          <Margin mg="15px 0 0 0">
            <NavigationLink href="/settings" icon={<SettingIcon />} text="Settings" />
          </Margin>

          <Margin mg="30px 0 0 0">
            <ToggleList items={['Светлая тема', 'Темная тема']} />
            <ToggleList items={['Русский язык', 'Английский язык']} />
          </Margin>

          <Margin mg="30px 0 0 0">
            <NavigationLink href="/logout" icon={<LogoutIcon />} text="Logout" />
          </Margin>
        </DroppedMenu>
    </UserAccauntStyled>
  )
};

export default UserAccaunt;
