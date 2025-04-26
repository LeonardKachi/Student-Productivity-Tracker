import { Navigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

export function RequireAuth({ children }) {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();

  if (route !== 'authenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function useAuth() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return {
    user,
    signOut,
    isAuthenticated: user !== undefined,
    userId: user?.attributes?.sub,
    email: user?.attributes?.email
  };
}