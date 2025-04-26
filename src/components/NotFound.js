import { Link } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variation="primary">Go to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;