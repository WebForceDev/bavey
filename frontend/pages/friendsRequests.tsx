import type { NextPage } from 'next'
import Link from 'next/link';

import FriendRequestInside from '../components/FriendRequestInside/FriendRequestInside';
import TwoColumnLayout from '../components/TwoColumnLayout/TwoColumnLayout';
import { useNavigation } from '../providers/NavigationProviders';
import { useFriendRequestsQuery } from '../redux/api/friendrequestApi';


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
        </div>
        <div>
          <Link href="/friends">My friends</Link>
          <Link href="/friendsRequests">My friend request</Link>

          <Link href="#inside">inside</Link>
          <Link href="#outside">outside</Link>
        </div>
    </TwoColumnLayout>
  )
}

export default FriendsPage;
