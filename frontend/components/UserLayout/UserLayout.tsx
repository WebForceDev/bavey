import React from 'react';

import Publication from '../../components/Publication/Publication';
import Board from '../../components/Board/Board';
import UserMiniTitle from '../../components/UserMiniTitle/UserMiniTitle';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import ContentGrid from '../../styles/components/ContentGrid';
import Margin from '../../styles/components/Margin';
import WrapperStyled from "../../styles/components/Wrapper"
import { IUser } from '../../types/user';


interface IUserLayoutProps {
  user:IUser,
  children: any
}

const UserLayout: React.FC<IUserLayoutProps> = ({user, children}) => {
  const publications = user.publications.map((publication) => (
      <Margin mg='0 0 30px 0' key={publication.slug}>
        <Publication publication={publication} user={user} />
      </Margin>
  ));

  return (
    <BaseLayout>
      { children }
      <WrapperStyled>
        <Margin mg='59px 0 0 0'>
          <ContentGrid>
              <div>
                <Margin mg='0 0 15px 0'>
                  <Board>
                    <Margin mg='8px 0 0 0'>
                      <UserMiniTitle user={user} />
                    </Margin>
                    <Margin mg='8px 0 0 0'>
                      <UserMiniTitle user={user}  />
                    </Margin>
                    <Margin mg='8px 0 0 0'>
                      <UserMiniTitle user={user}  />
                    </Margin>
                  </Board>
                </Margin>
                <Board>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle user={user}  />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle user={user}  />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle user={user}  />
                  </Margin>
                </Board>
              </div>

              <div>
                  { publications }  
              </div>

              <div>
                <Board>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle user={user}  />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle user={user}  />
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    <UserMiniTitle user={user}  />
                  </Margin>
                </Board>
              </div>
          </ContentGrid>
        </Margin>
      </WrapperStyled>
    </BaseLayout>
  )
}

export default UserLayout;
