import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { FillWrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { Header } from '@widgets/header';


const FriendsPage: NextPage = () => {
  return (
    <>
            <Header />
            <FillWrapper>
                <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
                d
                </TwoColumnGrid>
            </FillWrapper>
    </>
  )
};

export default dynamic(() => Promise.resolve(withAuth(FriendsPage)), {
  ssr: false
});
