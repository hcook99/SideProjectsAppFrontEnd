import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const StyledButton = withStyles({
  root: {
      backgroundColor: 'white',
      textTransform: 'none',
      float: 'right',
      height: '100%',
      color: '#007AFE',
      fontSize: 'bold',
      fontFamily: 'Montserrat',
      '&:hover': {
          color: 'white',
          backgroundColor: '#007AFE'
      }
  }
})(Button);

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  
  return !isAuthenticated && (
    <StyledButton onClick={loginWithRedirect}>Log in</StyledButton>
  );
}

export default LoginButton;