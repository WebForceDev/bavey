import type { NextPage } from 'next'
import Link from 'next/link';

import FriendRequestInside from '../components/FriendRequestInside/FriendRequestInside';
import TwoColumnLayout from '../components/TwoColumnLayout/TwoColumnLayout';
import { useFriendRequestsQuery } from '../redux/api/userApi';


const FriendsPage: NextPage = () => {
  const { data, isLoading } = useFriendRequestsQuery();
  
  let inside: any[] = [];

  if (data)  {
    inside = data.inside.map((req) => (
       <FriendRequestInside user={req.sender} message={req.message} key={req.sender.slug} />
    ));
  }

  return (
    <TwoColumnLayout>
        <div>
        {isLoading ? 'Loading' : 
         inside
        }
        </div>
        <div>
          <Link href="/friends">My friends</Link>
          <Link href="/friendsRequests">My friend request</Link>
        </div>
    </TwoColumnLayout>
  )
}

export default FriendsPage;
