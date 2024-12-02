import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "./appContext";

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { isAuthenticated } = useAuth();

    // Comment when dev
    if (!isAuthenticated) {
      return <Redirect href="/screens/login" />;
    }

    return <Component {...props} />;
  };
}
