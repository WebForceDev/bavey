import type { NextPage, GetServerSidePropsContext } from 'next'

import Publication from '../../components/Publication/Publication';
import Board from '../../components/Board/Board';
import UserMiniTitle from '../../components/UserMiniTitle/UserMiniTitle';
import BaseLayout from '../../components/BaseLayout/BaseLayout';
import ContentGrid from '../../styles/components/ContentGrid';
import Margin from '../../styles/components/Margin';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import WrapperStyled from "../../styles/components/Wrapper"
import { IUser } from '../../types/user';


interface IUserPageProps {
  user:IUser
}

const UserPage: NextPage<IUserPageProps> = ({user}) => {
  const publications = user.publications.map((publication) => (
      <Margin mg='0 0 30px 0' key={publication.slug}>
        <Publication publication={publication} user={user} />
      </Margin>
  ));

  return (
    <BaseLayout>
      <ProfileHeader user={ user } />
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

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.slug;
  const response = await fetch(
    `http://${process.env.HOST}:${process.env.BACKEND_PORT}/api/v1.0/user/${slug}`
  );
  const user:IUser = await response.json();

  return {
    props: { user }
  }
};
