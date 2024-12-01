import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from './appContext';

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Redirect href="/login" />;
    }

    return <Component {...props} />;
  };
}
