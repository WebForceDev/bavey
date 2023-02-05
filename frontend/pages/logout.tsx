import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../providers/AuthProviders';


const LogoutPage: NextPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(()=>{
    localStorage.setItem('token', '')
    auth?.setToken('')
    router.push({
        pathname: '/login',
    });
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default LogoutPage;
