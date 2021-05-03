import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CreateButton } from './Styles';

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    !isAuthenticated && (
      <CreateButton onClick={loginWithRedirect}>{window.isMobile ? 'Sign In' : 'Sign Up / Sign In'}</CreateButton>
    )
  );
}

export default LoginButton;
