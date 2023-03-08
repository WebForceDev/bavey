import React from "react";
import Image from "next/image";

import {UserTitleStyled} from './style';
import Button from '../../styles/components/Button';
import { useRelationTypeQuery } from "../../redux/api/friendrequestApi";
import { IUser } from "../../types/user";

import AvatarImage from "../../public/Avatar.png";


interface IUserTitle {
  user: IUser
}

const UserTitle: React.FC<IUserTitle> = ({ user }) => {
  const { data, isLoading } = useRelationTypeQuery({slug: user.slug});

  return (
    <UserTitleStyled>
        <Image
          src={AvatarImage}
          alt="Bavey"
          width={189}
          height={189}
        />
        <Button fill>Send message</Button>

        { !isLoading && data.relation_type == 'subscriber' &&
              <Button>Unsubscribe</Button>
        }
        { !isLoading && data.relation_type == 'friend' &&
              <Button>Unfriend</Button>
        }
        { !isLoading && data.relation_type == 'nobody' &&
              <Button>Subscribe</Button>
        }
    </UserTitleStyled>
  )
};

export default UserTitle;
