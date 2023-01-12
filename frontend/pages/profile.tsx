import type { NextPage } from 'next'

import RequiredAuth from '../components/RequiredAuth/RequiredAuth';


const ProfilePage: NextPage = () => {
  return (
    <RequiredAuth>
        prifile
    </RequiredAuth>
  )
};

export default ProfilePage;
