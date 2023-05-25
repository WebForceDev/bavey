import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { FriendRequestInside, FriendRequestOutside, useFriendRequestsQuery } from '@entities/friendRequest';
import { AcceptRequest, RejectRequest, UnsubscribeFromUser } from '@features/relationsButton';
import { Header } from '@widgets/header';
import { RelationsNavigationSideBar } from '@widgets/navigationsSideBars';


const FriendRequestsPage: NextPage = () => {
  const router = useRouter();

  const { data, isLoading } = useFriendRequestsQuery();
  let inside = [];
  let outside = [];

  if (data) {
    outside = data.outside;
    inside = data.inside;
  }

  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
            <div>
            <h1 name='outside'>Outside</h1>
            {outside.map((friendRequest) => (
              <Margin mb={30} key={friendRequest.recipient.username}>
                  <FriendRequestOutside
                    unsubscribeButtonSlot={<UnsubscribeFromUser username={friendRequest.recipient.username} />}
                    friendRequest={friendRequest}
                  />
              </Margin>
            ))}
            <h1 name='inside'>Inside</h1>
            {inside.map((friendRequest) => (
              <Margin mb={30} key={friendRequest.recipient.username}>
                  <FriendRequestInside
                    friendRequest={friendRequest}
                    acceptButtonSlot={<AcceptRequest frindRequestPK={friendRequest.pk} />}
                    rejectButtonSlot={<RejectRequest frindRequestPK={friendRequest.pk} />}
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

export default dynamic(() => Promise.resolve(withAuth(FriendRequestsPage)), {
  ssr: false
});
