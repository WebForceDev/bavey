import type { NextPage } from 'next'

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { Header } from '@widgets/header';
import { Subscription } from '@entities/community';
import { withAuth } from '@entities/viewer';


const community = {
    title: 'string',
    description: 'string',
    creation_date: 'string'
}
const SubsctiptionPage: NextPage = () => {
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
            <div>
              <Subscription community={community} />
              <Margin mt={30}>
                 <Subscription community={community} />
              </Margin>
              <Margin mt={30}>
                 <Subscription community={community} />
              </Margin>
              <Margin mt={30}>
                 <Subscription community={community} />
              </Margin>
              <Margin mt={30}>
                 <Subscription community={community} />
              </Margin>
            </div>
        </Wrapper>
      </Margin>
    </>
  )
};

export default withAuth(SubsctiptionPage);
