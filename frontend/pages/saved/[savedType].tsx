import type { NextPage } from 'next'
import { useRouter } from 'next/router';

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { Header } from '@widgets/header';
import { SavedPublicationNavigationSideBar } from '@widgets/navigationsSideBars';
import { withAuth } from '@entities/viewer';
import { SavedPublicationList } from '@widgets/savedPublicationList';


const SavedPublicationPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
            <SavedPublicationList savedType={router.query.savedType} />
            <SavedPublicationNavigationSideBar />
          </TwoColumnGrid>
        </Wrapper>
      </Margin>
    </>
  )
};

export default withAuth(SavedPublicationPage);
