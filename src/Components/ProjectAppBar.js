import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Icon,
  InputAdornment
} from '@material-ui/core';
import {
  ProjectTextField,
  CreateButton,
  SearchButton
} from './Styles';
import logo from '../ideas.svg';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import LoginButton from './LoginButton';
import UserIconMenu from './UserIconMenu';
import CreateProjectDialog from './CreateProjectDialog';

function ProjectAppBar(props) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);

  if (props.parentSearch !== search) {
    setSearch(props.parentSearch);
  }

  const changeHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
    props.handleChange(value);
  };

  const openSearchChange = (event) => {
    setOpenSearch(!openSearch)
  }

  const handleOpen = async () => {
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    } else {
      setOpen(true);
    }
  };

  const goToHomePage = () => {
    props.history.push(`/`);
  };

  return (
    <div>
      <AppBar
        position='static'
        style={{ backgroundColor: 'white', boxShadow: '0.2px'}}>
        <Toolbar style={{ minHeight: 0 }}>
          <Grid container direction='column'>
            <Grid container item alignContent='center' style={{ minHeight: 0, height: '100%', padding: '1px' }}>
              <Grid
                container
                item
                xs={7}
                direction='row'
                alignItems='center'
                onClick={goToHomePage}
                style={{ minHeight: 0, height: '100%' }}>
                <Icon style={{ height: '80%' }}>
                  <img
                    src={logo}
                    style={{ width: '100%', height: '100%' }}
                    alt={'Logo'}
                  />
                </Icon>
                <Typography
                  style={{
                    marginLeft: '1.0rem',
                    color: 'black',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bolder',
                    fontSize: '1.25rem',
                  }}>
                  SiPro
                </Typography>
                <Grid
                item
                xs={7}
                style={{ minHeight: 0, height: '100%' }}>
                  { window.isMobile ? <></> :
                    <ProjectTextField
                      id='standard-basic'
                      placeholder='Search for Projects'
                      style={{
                        marginLeft: '1em',
                        border: '3px',
                        visibility: props.isUserPage ? 'hidden' : null,
                      }}
                      name='search'
                      variant='outlined'
                      value={search}
                      onChange={changeHandler}
                      inputProps={{
                        style: {
                          paddingTop: '4px',
                          paddingBottom: '4px',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon style={{color: '#007afe'}}/>
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                </Grid>
              </Grid>
              <Grid
                container
                item
                alignItems='center'
                justify='flex-end'
                direction='row'
                xs={5}
                style={{ minHeight: 0 }}>
                { window.isMobile ? 
                  <SearchButton onClick={openSearchChange}>
                    <SearchIcon/>
                  </SearchButton> :
                  <CreateButton
                    onClick={handleOpen}
                    style={{ marginRight: '1rem' }}>
                    <AddIcon className="add-icon"/>
                    Create a project
                  </CreateButton>
                }
                {props.user ? (
                  <UserIconMenu
                    username={props.user.nickname}
                    userPicture={props.user.picture}
                    openDialog={handleOpen}
                  />
                ) : (
                  <LoginButton />
                )}
                <CreateProjectDialog 
                  open={open} 
                  isAuthenticated={props.isAuthenticated} 
                  loginWithRedirect={props.loginWithRedirect}
                  user={props.user}
                  setOpen={setOpen}/>
              </Grid>
            </Grid>
            { window.isMobile && openSearch ? 
            <Grid>
              <ProjectTextField
                id='standard-basic'
                placeholder='Search for Projects'
                style={{
                  marginLeft: '1em',
                  border: '3px',
                  visibility: props.isUserPage ? 'hidden' : null,
                }}
                name='search'
                variant='outlined'
                value={search}
                onChange={changeHandler}
                inputProps={{
                  style: {
                    paddingTop: '4px',
                    paddingBottom: '4px',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{color: '#007afe'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid> : <></>
            }
          </Grid>
        </Toolbar>
      </AppBar>
      {window.isMobile ? <></> : <Toolbar />}
    </div>
  );
}

export default withRouter(ProjectAppBar);
