import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Components/Loading';
import { useAuth0 } from '@auth0/auth0-react';

function GuardedRoute({ component, ...args }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => {
          if (isAuthenticated) {
            getAccessTokenSilently.catch((error) => {
              return <Loading />;
            });
          }
          return <Loading />;
        },
      })}
      {...args}
    />
  );
}

export default GuardedRoute;
