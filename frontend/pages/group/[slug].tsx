import type { NextPage, GetServerSidePropsContext } from 'next'

import GroupHeader from '../../components/GroupHeader/GroupHeader';
import ThreeColumnLayout from '../../components/ThreeColumnLayout/ThreeColumnLayout';
import { useNavigation } from '../../providers/NavigationProviders';
import Publication from '../../components/Publication/Publication';
import { IUser } from '../../types/user';


interface IUserPageProps {
  user:IUser
}

const UserPage: NextPage<IUserPageProps> = ({user}) => {
  const navigationContext = useNavigation();
  navigationContext?.setActivePage('user.slug')
  return (
    <>
        <GroupHeader></GroupHeader>
        <ThreeColumnLayout>
            <div>sd</div>
            <div>
            </div>
            <div>sd</div>
        </ThreeColumnLayout>
    </>
  )
}

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.slug;
  const responseUserInfo = await fetch(
    `http://${process.env.HOST}:${process.env.BACKEND_PORT}/api/v1.0/user/${slug}`
  );
  const user:IUser = await responseUserInfo.json();

  return {
    props: { user }
  }
};
