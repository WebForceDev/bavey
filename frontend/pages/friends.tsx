import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { Relation, useGetRelationQuery } from '@entities/relation';
import { useViewer, withAuth } from '@entities/viewer';
import { RemoveFriend } from '@features/relationsButton';
import { Header } from '@widgets/header';
import { RelationsNavigationSideBar } from '@widgets/navigationsSideBars';


const FriendsPage: NextPage = () => {
  const router = useRouter();
  const viewerContext = useViewer();
  let username = router.query.username as string;
  if (!username) {
    username = viewerContext.authViewer.user.username;
  }
  const { data, isLoading } = useGetRelationQuery(username);
  let friends = [];

  if (data) {
    friends = data.friends;
  }
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
            <div>
            {friends.map((friend) => (
              <Margin mb={30} key={friend.username}>
                <Relation
                  username={friend.username}
                  avatar={friend.avatar}
                  removeFriendButtonSlot={<RemoveFriend username={friend.username} />}
                />
              </Margin>
            ))}
            </div>
            <RelationsNavigationSideBar />
          </TwoColumnGrid>
        </Wrapper>
      </Margin>
    </>
  )
};

export default dynamic(() => Promise.resolve(withAuth(FriendsPage)), {
  ssr: false
});
