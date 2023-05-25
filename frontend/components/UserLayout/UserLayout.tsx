import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Publication from '../../components/Publication/Publication';
import Board from '../../components/Board/Board';
import UserMiniTitle from '../../components/UserMiniTitle/UserMiniTitle';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import ContentGrid from '../../styles/components/ContentGrid';
import Margin from '../../styles/components/Margin';
import WrapperStyled from "../../styles/components/Wrapper"
import PublicationCreator from '../PublicationCreator/PublicationCreator';
import { useRelationsQuery } from '../../redux/api/userApi';
import { IUser } from '../../types/user';


interface IUserLayoutProps {
  user:IUser,
  children: any,
}

const UserLayout: React.FC<IUserLayoutProps> = ({ user, children }) => {
  const [publicationList, setPublicationList] = useState(user.publications)
  const router = useRouter();
  const { data, isLoading } = useRelationsQuery({slug: router.query.slug});

  const publications = publicationList.map((publication) => (
      <Margin mg='0 0 30px 0' key={publication.slug}>
        <Publication publication={publication} user={user} />
      </Margin>
  ));

  let friends: any[] = [];
  let subscribersColunt = 0;
  let friendsColunt = 0;
  let publicationsColunt = 0;
  if (data)  {
    subscribersColunt =  data.subscribers.length;
    friendsColunt =  data.friends.length;
    publicationsColunt =  publicationList.length;
    friends = data.friends.slice(0,6).map((friend) => (
      <Margin mg='8px 0 0 0' key={friend.from_user.slug}>
        <UserMiniTitle autor={friend.from_user}  />
      </Margin>
    ));
  }

  return (
    <BaseLayout>
      { children }
      <WrapperStyled>
        <Margin mg='59px 0 0 0'>
          <ContentGrid>
              <div>
                <Margin mg='0 0 15px 0'>
                {isLoading ? 'Loading' : 
                  <Board title='Friends' href={`/friends?slug=${user.slug}`}>
                    { friends }
                  </Board>
                }
                </Margin>
              </div>

              <div>
                <Margin mg='0 0 30px 0'>
                  <PublicationCreator setPublicationList={setPublicationList} wall={user.slug} wall_type="user" />
                </Margin>
                  { publications.reverse() }  
              </div>

              <div>
              {isLoading ? 'Loading' : 
                <Board title='Statistics'>
                  <Margin mg='8px 0 0 0'>
                    Subscribers: { subscribersColunt }
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    Friends: { friendsColunt }
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    Publications count: { publicationsColunt }
                  </Margin>
                </Board>
              }
              </div>
          </ContentGrid>
        </Margin>
      </WrapperStyled>
    </BaseLayout>
  )
}

export default UserLayout;
