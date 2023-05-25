import type { NextPage } from 'next'

import { useNavigation } from '../providers/NavigationProviders';
import { useGetSubscriptionsListQuery } from '../redux/api/communityApi';
import SubscriptionCommunity from '../components/SubscriptionCommunity/SubscriptionCommunity';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import WrapperStyled from '../styles/components/Wrapper';
import Margin from '../styles/components/Margin';


const LogoutPage: NextPage = () => {
  const navigation = useNavigation();
  const { isLoading, data } = useGetSubscriptionsListQuery();
  navigation?.setActivePage('Subscriptions')
  
  let subscriptionsCommunities: any[] = [];
  if (data)  {
    console.log(data)
    subscriptionsCommunities = data.map((community) => (
       <SubscriptionCommunity community={community} key={community.slug} />
    ));
  }

  return (
    <BaseLayout>
        <WrapperStyled>
            <Margin mg="90px 0 0 0">
                { !isLoading &&
                    <div>
                        { subscriptionsCommunities }
                    </div>
                }
                { !isLoading && data.length == 0 &&
                    <h2>
                        No subscriptions
                    </h2>
                }
            </Margin>
        </WrapperStyled>
    </BaseLayout>
  )
}

export default LogoutPage;
