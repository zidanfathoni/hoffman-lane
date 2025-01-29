"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Storage } from './storage';

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const userId = Storage.get('local', 'userID');

      if (!userId) {
        router.push('/auth');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
