import React, { useState } from 'react';
import { Menu, MenuItem, Avatar } from '@material-ui/core';
import { UserIconButton } from './Styles'
import { withRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function UserIconMenu(props) {
  const { isAuthenticated, logout } = useAuth0();

  const [open, setOpen] = useState('');

  const handleClose = () => {
    setOpen(null);
  };

  const logoutButton = () => {
    if (isAuthenticated) {
      logout();
    }
  };

  const goToUserPage = () => {
    props.history.push(`/user`);
  };

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const openCreateDialog = () => {
    props.openDialog();
  }

  return (
    <div>
      <UserIconButton
        edge='end'
        onClick={handleClick}
        size='small'
        disableRipple={true}>
        <Avatar src={props.userPicture} variant='rounded' alt='User image' />
      </UserIconButton>
      <Menu
        anchorEl={open}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id='user-menu'
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}>
        <MenuItem onClick={goToUserPage}>My Profile</MenuItem>
        {
          window.isMobile ? 
            <MenuItem onClick={openCreateDialog}>Create Project</MenuItem> : <></>
        }
        <MenuItem onClick={logoutButton}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(UserIconMenu);
