
import React, { useState } from 'react';
import { Menu, MenuItem, Fab } from "@material-ui/core"
import { withRouter } from 'react-router-dom'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import { useAuth0 } from '@auth0/auth0-react'

function UserIconMenu(props) {
    
    const {
        isAuthenticated,
        logout,
    } = useAuth0();

    const [open, setOpen] = useState('');
    
    const handleClose = () => {
        setOpen(null);
    };
    

    const logoutButton = () => {
        if(isAuthenticated){
            logout();
        }
    }

    const goToUserPage = () => {
        props.history.push(`/${props.username}`)
    }

    const handleClick = event => {
        setOpen(event.currentTarget)
    };

    return (
        <div>
            <Fab edge="end" onClick={handleClick} size="medium" style={{backgroundColor: 'white'}}>
                <AccountCircleRoundedIcon/>
            </Fab>
            <Menu
            anchorEl={open}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            id="user-menu"
            keepMounted
            open={Boolean(open)}
            onClose={handleClose}
            >
                <MenuItem>My Bookmarks</MenuItem>
                <MenuItem onClick={goToUserPage}>My Profile</MenuItem>
                <MenuItem onClick={logoutButton}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default withRouter(UserIconMenu);