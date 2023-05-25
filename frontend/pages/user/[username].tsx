import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Wrapper, ThreeColumnGrid, Margin } from '@shared/ui';
import { userApi, IUser } from '@entities/User';
import { relationApi } from '@entities/relation';
import { CreatePublication } from '@features/createPublication';
import { Header } from '@widgets/header';
import { UserHeader } from '@widgets/userHeader';
import { PublicationList } from '@widgets/publicationsList';
import { UserFriends } from '@widgets/userFriends';
import { UserStatistic } from '@widgets/statistic/ui/UserStatistic';

import { Store, wrapper } from '../../redux/store';


interface IUserPageProps {
  user: IUser,
  publications: any,
  friends: any,
}

const UserPage: NextPage<IUserPageProps> = ({ user, publications, friends }) => {
  return (
    <>
      <Header />
      <Margin mt={80}>
        <UserHeader user={user} />
      </Margin>
      <Wrapper>
        <Margin mt={30}>
          <ThreeColumnGrid
            firstColumnSize='20%'
            secondColumnSize='60%'
            thirdColumnsSize='20%'
          >
            <UserFriends friends={friends.friends} username={user.username} />
            <div>
              <Margin mb={35}>
                <CreatePublication
                  wallSlug={user.username}
                  wallType='user' />
              </Margin>
              <PublicationList publicationsFromServerRender={publications} />
            </div>  
            <UserStatistic username={user.username} />
          </ThreeColumnGrid>
        </Margin>
      </Wrapper>
    </>
  )
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store: Store) => async (context: GetServerSidePropsContext) => {
    const username = context.query.username as string;
    const userRequest = await store.dispatch(userApi.endpoints.getUser.initiate(username))
    const userFriendsRequest = await store.dispatch(relationApi.endpoints.getRelation.initiate(username))
    const publicationsRequest = await store.dispatch(userApi.endpoints.getPublicationList.initiate({
      username: username,
      offset: 0,
      limit: 5
    }))
    await Promise.all(store.dispatch(userApi.util.getRunningQueriesThunk()))
    const user = userRequest.data;
    const publications = publicationsRequest.data;
    const friends = userFriendsRequest.data;
    return {
      props: {
        user: user,
        publications: publications,
        friends: friends
      },
    }
  },
)
