import React from "react";
import Image from "next/image";

import {UserTitleStyled} from './style';
import Button from '../../styles/components/Button';
import { useRelationTypeQuery } from "../../redux/api/friendrequestApi";
import { useUnsubscribeMutation, useSubscribeMutation, useDeletefriendMutation } from "../../redux/api/friendrequestApi";
import { IUser } from "../../types/user";

import AvatarImage from "../../public/Avatar.png";


interface IUserTitle {
  user: IUser
}

const UserTitle: React.FC<IUserTitle> = ({ user }) => {
  const { data, isLoading } = useRelationTypeQuery({slug: user.slug});
  const [unsubscr] = useUnsubscribeMutation();
  const [subscr] = useSubscribeMutation();
  const [deletefriend] = useDeletefriendMutation();

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
              <Button onClick={() => unsubscr({slug: user.slug})}>Unsubscribe</Button>
        }
        { !isLoading && data.relation_type == 'friend' &&
              <Button onClick={() => deletefriend({slug: user.slug})}>Unfriend</Button>
        }
        { !isLoading && data.relation_type == 'nobody' &&
              <Button onClick={() => subscr({slug: user.slug})}>Subscribe</Button>
        }
    </UserTitleStyled>
  )
};

export default UserTitle;
