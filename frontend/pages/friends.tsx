import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router'


import Relation from '../components/Relation/Relation';
import TwoColumnLayout from '../components/TwoColumnLayout/TwoColumnLayout';
import { useRelationsQuery } from '../redux/api/userApi';


const FriendsPage: NextPage = () => {
  const router = useRouter();
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
        </div>
        <div>
          <Link href="/friends">My friends</Link>
          <Link href="/friendsRequests">My friend request</Link>
        </div>
    </TwoColumnLayout>
  )
}

export default FriendsPage;
