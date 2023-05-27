import type { NextPage } from 'next'
import { useRouter } from 'next/router';

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { useSearchQuery } from '@features/search';
import { Header } from '@widgets/header';
import { SearchFillterSideBar } from '@widgets/navigationsSideBars';


const SavedPublicationPage: NextPage = () => {
  const router = useRouter();
  let search = '';
  if (router.query['search']) {
    search = router.query['search'] as string
  }
  const { data, isLoading } = useSearchQuery({search, fillter: router.query['fillter']});
  console.log(data)
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
            <div>
                {!isLoading && data.map((user) => (<a href={`/user/${user.username}`}>{user.username}</a>))}   
            </div>
            <SearchFillterSideBar search={search}/>
          </TwoColumnGrid>
        </Wrapper>
      </Margin>
    </>
  )
};


export default withAuth(SavedPublicationPage);
