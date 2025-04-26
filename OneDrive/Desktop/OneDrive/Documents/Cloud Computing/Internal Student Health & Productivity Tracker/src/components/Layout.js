import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './Auth';
import { Button, Flex, Heading } from '@aws-amplify/ui-react';

function Layout() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div className="container py-4">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Heading level={3}>Student Productivity Tracker</Heading>
        {isAuthenticated && (
          <Flex direction="row" gap="1rem">
            <Link to="/dashboard">
              <Button variation="link">Dashboard</Button>
            </Link>
            <Link to="/insights">
              <Button variation="link">Insights</Button>
            </Link>
            <Button variation="primary" onClick={signOut}>
              Sign Out
            </Button>
          </Flex>
        )}
      </Flex>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;