import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { existsVieweInStorage } from '@shared/lib';


export function withAuth(WrappedComponent: React.FC) {
  return function WithAuth() {
    const router = useRouter();
    const isAuthenticated = existsVieweInStorage();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    return <WrappedComponent/>;
  };
}
