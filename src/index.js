import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createBrowserHistory } from 'history';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

export const history = createBrowserHistory();

const link = new HttpLink({
  uri: 'https://sideprojectsappserver.herokuapp.com/api/projects'
});   

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const onRedirectCallback = (appState) => {
  history.replace(appState?.returnTo || window.location.pathname);
};

console.log(process.env.AUTH0_APP_DOMAIN);
console.log(process.env.AUTH0_CLIENT_ID);

ReactDOM.render(
  <Auth0Provider
    domain={process.env.AUTH0_APP_DOMAIN}
    clientId={process.env.AUTH0_CLIENT_ID}
    redirectUri={window.location.href}
    onRedirectCallback={onRedirectCallback}
    cacheLocation="localstorage">
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App/>
      </ApolloHooksProvider>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
