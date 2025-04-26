const awsConfig = {
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
      oauth: {
        domain: process.env.REACT_APP_COGNITO_DOMAIN,
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
        redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
        responseType: 'code'
      }
    },
    API: {
      endpoints: [
        {
          name: 'StudentTrackerAPI',
          endpoint: process.env.REACT_APP_API_ENDPOINT,
          region: process.env.REACT_APP_AWS_REGION
        }
      ]
    }
  };
  
  export default awsConfig;