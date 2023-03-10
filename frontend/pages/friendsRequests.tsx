import type { NextPage } from 'next'
import Link from 'next/link';

import FriendRequestInside from '../components/FriendRequestInside/FriendRequestInside';
import NavigationLink from '../components/NavigationLink/NavigationLink';
import TwoColumnLayout from '../components/TwoColumnLayout/TwoColumnLayout';
import { useNavigation } from '../providers/NavigationProviders';
import { useFriendRequestsQuery } from '../redux/api/friendrequestApi';
import Margin from '../styles/components/Margin';
import NavigationSideBar from '../components/NavigationSideBar/NavigationSideBar';

import FriendsIcon from '../public/friends.svg';
import FriendRequestIcon from '../public/friendRequest.svg';
import InsideIcon from '../public/inside.svg';
import OutSideIcon from '../public/outside.svg';


const FriendsPage: NextPage = () => {
  const { data, isLoading } = useFriendRequestsQuery();
  const navigationContext = useNavigation();
  navigationContext?.setActivePage('Friends')
  
  let inside: any[] = [];
  let outside: any[] = [];

  if (data)  {
    inside = data.inside.map((req) => (
       <FriendRequestInside user={req.recipient} message={req.message} key={req.sender.slug} outside={true} />
    ));
    outside = data.outside.map((req) => (
      <FriendRequestInside user={req.sender} message={req.message} key={req.sender.slug} outside={false} />
    ));
  }

  return (
    <TwoColumnLayout>
        <div>
        {isLoading ? 'Loading' : 
          <>
            <div id="inside">
              { inside }
            </div>
            <div id="outside">
              { outside }
            </div>
          </>
        }
        {
          inside.length == 0 && outside.length == 0 && !isLoading &&
          <h2>No friend requests</h2>
        }
        </div>

        <NavigationSideBar>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Friends' href='/friends' alt='friends' icon={FriendsIcon} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='FriendsRequests' href='/friendsRequests' alt='friendsRequests' icon={FriendRequestIcon} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Inside' href='#inside' alt='inside' icon={InsideIcon} />
          </Margin>
          <Margin mg='20px 0 15px 0'>
            <NavigationLink text='Outside' href='#outside' alt='outside' icon={OutSideIcon} />
          </Margin>
        </NavigationSideBar>

    </TwoColumnLayout>
  )
}

export default FriendsPage;
