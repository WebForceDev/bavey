import type { NextPage, GetServerSidePropsContext } from 'next'

import UserLayout from '../../components/UserLayout/UserLayout';
import UserHeader from '../../components/UserHeader/UserHeader';
import { IUser } from '../../types/user';


interface IUserPageProps {
  user:IUser
}

const UserPage: NextPage<IUserPageProps> = ({user}) => {
  return (
    <UserLayout user={ user }>
      <UserHeader user={ user } />
    </UserLayout>
  )
}

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.slug;
  const response = await fetch(
    `http://${process.env.HOST}:${process.env.BACKEND_PORT}/api/v1.0/user/${slug}`
  );
  const user:IUser = await response.json();
  return {
    props: { user }
  }
};
