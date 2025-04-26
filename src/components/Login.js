import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <Authenticator
          loginMechanisms={['email']}
          services={{
            async handleSignIn(formData) {
              const { username, password } = formData;
              // Custom sign-in logic if needed
              return { username, password };
            }
          }}
          components={{
            SignIn: {
              Header() {
                return <h2 className="text-center mb-4">Student Login</h2>;
              }
            }
          }}
          initialState="signIn"
          variation="modal"
        >
          {({ user }) => {
            if (user) {
              navigate('/dashboard');
            }
            return null;
          }}
        </Authenticator>
      </div>
    </div>
  );
}

export default Login;