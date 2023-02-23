import type { NextPage } from 'next'
import Link from 'next/link';


import Relation from '../components/Relation/Relation';
import TwoColumnLayout from '../components/TwoColumnLayout/TwoColumnLayout';


const FriendsPage: NextPage = () => {
  return (
    <TwoColumnLayout>
        <div>
          <Relation></Relation>
          <Relation></Relation>
          <Relation></Relation>
          <Relation></Relation>
          <Relation></Relation>
        </div>
        <div>
          <Link href="#">My friends</Link>
          <Link href="#">My friend request</Link>
        </div>
    </TwoColumnLayout>
  )
}

export default FriendsPage;
