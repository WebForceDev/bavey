import React from "react";
import Image from "next/image";

import ArrowIcon from '@public/arrow.svg'
import BookmarkIcon from '@public/bookmarkIcon.svg'
import CommentIcon from '@public/commentIcon.svg'
import CommunityIcon from '@public/communityIcon.svg'
import DownVoiceIcon from '@public/downVoiceIcon.svg'
import UpVoiceIcon from '@public/upVoiceIcon.svg'
import FriendRequestIcon from '@public/friendRequest.svg'
import FriendsIcon from '@public/friends.svg'
import ImageIcon from '@public/image.svg'
import InsideIcon from '@public/inside.svg'
import OutsideIcon from '@public/outside.svg'
import ProfileIcon from '@public/ProfileIcon.svg'
import SettingIcon from '@public/settingIcon.svg'
import StarIcon from '@public/star.svg'


export enum IconsEnum {
    ARROW = ArrowIcon,
    BOOKMARK = BookmarkIcon,
    COMMENT = CommentIcon,
    COMMUNITY = CommunityIcon,
    DOWN_VOICE = DownVoiceIcon,
    UP_VOICE = UpVoiceIcon,
    FRIEND_REQUEST = FriendRequestIcon,
    FRIENDS = FriendsIcon,
    IMAGE = ImageIcon,
    INSIDE = InsideIcon,
    OUTSIDE = OutsideIcon,
    PROFILE = ProfileIcon,
    SETTING = SettingIcon,
    STAR = StarIcon,
}

interface IIconProps {
    icon: IconsEnum
}

export const Icon: React.FC<IIconProps> = ({ icon }) => {
    return (
        <div>
            <Image src={icon} alt='icon' />
        </div>
    )
};
