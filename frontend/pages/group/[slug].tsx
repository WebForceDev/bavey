import type { NextPage, GetServerSidePropsContext, GetServerSideProps } from 'next';
import type { Store } from '../../redux/store';
import { useRouter } from 'next/router';

import GroupHeader from '../../components/GroupHeader/GroupHeader';
import ThreeColumnLayout from '../../components/ThreeColumnLayout/ThreeColumnLayout';
import { useNavigation } from '../../providers/NavigationProviders';
import { communityApi } from '../../redux/api/communityApi';
import Board from '../../components/Board/Board';
import { wrapper } from '../../redux/store';
import { ICommunity } from '../../types/user';
import PublicationCreator from '../../components/PublicationCreator/PublicationCreator';
import { useGetCommunityStatisticQuery } from '../../redux/api/communityApi'; 
import Margin from '../../styles/components/Margin';


interface ICommunityPageProps {
  community:ICommunity

}

const CommunityPage: NextPage<ICommunityPageProps> = ({community}) => {
  const router = useRouter();
  const navigationContext = useNavigation();
  navigationContext?.setActivePage(router.query.slug);
  const { isLoading, data } = useGetCommunityStatisticQuery({slug:router.query.slug})

  return (
    <>
        <GroupHeader community={community}></GroupHeader>
        <ThreeColumnLayout>
            <Board title='Creation date'>
              { community.creation_date }
            </Board>
            <div>
              <PublicationCreator>

              </PublicationCreator>
            </div>
            { !isLoading &&
            <Board title='Statistics'>
              <Margin mg='8px 0 0 0'>
                Subscribers: { data.subscribers_count }
              </Margin>
              <Margin mg='8px 0 0 0'>
                Friends subscribers: { data.friens_subscribers_count }
              </Margin>
            </Board>
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
