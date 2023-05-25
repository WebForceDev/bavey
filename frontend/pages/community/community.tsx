import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import type { Store } from '../../redux/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import GroupHeader from '../../components/GroupHeader/GroupHeader';
import ThreeColumnLayout from '../../components/ThreeColumnLayout/ThreeColumnLayout';
import { useNavigation } from '../../providers/NavigationProviders';
import { communityApi } from '../../redux/api/communityApi';
import Board from '../../components/Board/Board';
import { wrapper } from '../../redux/store';
import { ICommunity } from '../../types/user';
import PublicationCreator from '../../components/PublicationCreator/PublicationCreator';
import Publication from '../../components/Publication/Publication';
import { useGetCommunityStatisticQuery, useGetPulicationListQuery } from '../../redux/api/communityApi'; 
import Margin from '../../styles/components/Margin';


interface ICommunityPageProps {
  community:ICommunity

}

const CommunityPage: NextPage<ICommunityPageProps> = ({community}) => {
  const router = useRouter();
  const navigationContext = useNavigation();
  const slug = router.query.slug
  navigationContext?.setActivePage(slug);
  const statistic = useGetCommunityStatisticQuery({slug: slug})

  const [page, setPage] = useState(1);
  const pulicationListQuery = useGetPulicationListQuery({slug: slug, offset: page, limit: 20});
  const publications = pulicationListQuery.data?.results ?? [];
  const [newPublications, setNewPublications] = useState([]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !pulicationListQuery.isFetching) {
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, pulicationListQuery.isFetching]);

  return (
    <>
        <GroupHeader community={community}></GroupHeader>
        <ThreeColumnLayout>
          <div>
            <Board title='Creation date'>
              { community.creation_date }
            </Board>
          </div>
            
            <div>
              <PublicationCreator setPublicationList={setNewPublications} wall={slug} wall_type="community" />
              {newPublications.map((publication) => (
                <Margin mg='30px 0 0 0'  key={publication.slug}>
                  <Publication publication={publication}></Publication>
                </Margin>
              ))}
              { publications.map((publication) => (
                <Margin mg='30px 0 0 0'  key={publication.slug}>
                  <Publication publication={publication}></Publication>
                </Margin>
              ))}
            </div>
            { !statistic.isLoading &&
              <div>
                <Board title='Statistics'>
                  <Margin mg='8px 0 0 0'>
                    Subscribers: { statistic.data.subscribers_count }
                  </Margin>
                  <Margin mg='8px 0 0 0'>
                    Friends subscribers: { statistic.data.friens_subscribers_count }
                  </Margin>
                </Board>
              </div>
            }
        </ThreeColumnLayout>
    </>
  )
}

export default CommunityPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store: Store) => async (context: GetServerSidePropsContext) => {
    const slug = context.query.slug;
    store.dispatch(communityApi.endpoints.getCommunityInfo.initiate({slug: slug}))
    const res = await Promise.all(store.dispatch(communityApi.util.getRunningQueriesThunk()))
    const community = res[0].data

    return {
      props: {
        community: community
      },
    }
  },
)
