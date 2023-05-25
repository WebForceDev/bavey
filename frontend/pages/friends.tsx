import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ThemeContext } from 'styled-components';
import { useContext } from "react";

import { useNavigation } from '../providers/NavigationProviders';
import Relation from '../components/Relation/Relation';
import TwoColumnLayout from '../components/TwoColumnLayout/TwoColumnLayout';
import { useRelationsQuery } from '../redux/api/userApi';
import NavigationSideBar from '../components/NavigationSideBar/NavigationSideBar';
import NavigationLink from '../components/NavigationLink/NavigationLink';
import Margin from '../styles/components/Margin';

import FriendsIcon from '../public/friends.svg';
import FriendRequestIcon from '../public/friendRequest.svg';


const FriendsPage: NextPage = () => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const navigationContext = useNavigation();
  navigationContext?.setActivePage('Friends')

  let slug: string|string[] = ""
  if (router.query.slug ){
    slug = router.query.slug
  }
  const { data, isLoading } = useRelationsQuery({slug: slug});
  
  let friends: any[] = [];

  if (data)  {
    friends = data.friends.map((frend) => (
       <Relation slug={frend.from_user.slug} key={frend.from_user.slug } />
    ));
  }

  return (
    <TwoColumnLayout>
        <div>
        {isLoading ? 'Loading' : 
         friends
        }
        {
          friends.length == 0 && !isLoading &&
          <h2>No friends</h2>
        }
        </div>
        <NavigationSideBar>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Friends' href='/friends' icon={<FriendsIcon stroke={theme.color.white} />} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='FriendsRequests' href='/friendsRequests' icon={<FriendRequestIcon stroke={theme.color.white} />} />
          </Margin>
        </NavigationSideBar>
    </TwoColumnLayout>
  )
}

export default FriendsPage;
