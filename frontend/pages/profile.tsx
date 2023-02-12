import type { NextPage } from 'next'
import { useEffect } from 'react';

import RequiredAuth from '../components/RequiredAuth/RequiredAuth';
import UserLayout from '../components/UserLayout/UserLayout';
import { useProfileQuery } from '../redux/api/userApi';
import { IUser } from '../types/user';


const ProfilePage: NextPage = () => {
  const {
    data,
    isLoading,
  } = useProfileQuery();
  useEffect(()=>{
  }, [])

  return (
    <RequiredAuth>
      {isLoading ? 'Loading' : 
        <UserLayout user={data}>
          d
        </UserLayout>
      }
    </RequiredAuth>
  )
};

export default ProfilePage;
