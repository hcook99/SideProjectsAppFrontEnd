import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Icon,
  Dialog,
  DialogContent,
  DialogActions,
  FormControlLabel,
  GridListTile,
  InputAdornment
} from '@material-ui/core';
import {
  ProjectTextField,
  CreateButton,
  CreateProjectTitle,
  SaveButton,
  CancelButton,
  TagToolTip,
  FilterStyleTypography,
  PlatformsCreate,
  PlatformCreateCheckbox,
  SearchButton,
  PlatformGridList
} from './Styles';
import logo from '../ideas.svg';
import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlineBlankSharp from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';
import SearchIcon from '@material-ui/icons/Search';
import LoginButton from './LoginButton';
import UserIconMenu from './UserIconMenu';
import ProjectSelect from './ProjectSelect';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../graphqlQueries';

function ProjectAppBar(props) {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [platforms, setPlatforms] = React.useState([]);
  const [amountOfWork, setAmountOfWork] = React.useState('');
  const [createProject] = useMutation(CREATE_PROJECT);
  const listOfPlatforms = [
    'Mobile',
    'Frontend',
    'Backend',
    'Embedded',
    'Desktop',
    'Blockchain',
    'AI/ML',
    'Tooling',
    'AR/VR',
    'Bots',
    'Design/UX',
    'Other',
  ];
  const [openSearch, setOpenSearch] = React.useState(false);

  if (props.parentSearch !== search) {
    setSearch(props.parentSearch);
  }

  const getUserIdentifier = (userSub) => {
    if (userSub) {
      const capturingRegex = /^.*\|(?<identifier>.+)$/;
      const found = userSub.match(capturingRegex);
      return found.groups.identifier;
    }
  };

  const changeHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
    props.handleChange(value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const openSearchChange = (event) => {
    setOpenSearch(!openSearch)
  }

  const handleTagChange = (event) => {
    if (
      event.target.value[event.target.value.length - 1] === ',' &&
      event.nativeEvent.data
    ) {
      event.target.value += ' ';
    }
    setTags(event.target.value);
  };

  const handleOpen = async () => {
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setDifficulty('');
    setPlatforms([]);
    setAmountOfWork('');
    setTags('');
  };

  const handleSave = async () => {
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    } else {
      const userId = getUserIdentifier(props.user.sub);
      await createProject({
        variables: {
          title,
          description,
          creatorUserId: userId,
          difficulty,
          platforms,
          amountOfWork,
          tags,
        },
      });
      handleClose();
      handleCreate();
    }
  };

  const handleCreate = () => {
    window.location.reload();
  };

  const handleFilterClick = (event) => {
    const value = event.target.name;
    let tempPlatforms = [...platforms];
    if (platforms.includes(value)) {
      tempPlatforms.splice(platforms.indexOf(value), 1);
    } else {
      tempPlatforms.push(value);
    }
    setPlatforms(tempPlatforms);
  };

  const changeSelect = (label, value) => {
    switch (label) {
      case 'Difficulty':
        setDifficulty(value);
        break;
      case 'Amount of Work':
        setAmountOfWork(value);
        break;
      default:
        break;
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
                <Dialog
                  open={open}
                  onClose={handleClose}
                  fullWidth={true}
                  maxWidth='sm'>
                  <CreateProjectTitle disableTypography={true}>
                    Create Project
                  </CreateProjectTitle>
                  <DialogContent
                    style={{ marginLeft: window.isMobile ? '0' : '1rem', marginRight: window.isMobile ? '0' : '1rem' }}>
                    <ProjectTextField
                      id='title'
                      label='Name'
                      type='text'
                      variant='outlined'
                      value={title}
                      onChange={handleTitleChange}
                      style={{ marginTop: 0 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TagToolTip title='Use , to seperate tags.' arrow>
                      <ProjectTextField
                        id='tags'
                        label='Tags'
                        type='text'
                        variant='outlined'
                        value={tags}
                        onChange={handleTagChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TagToolTip>
                    <ProjectTextField
                      id='description'
                      label='Description'
                      type='text'
                      variant='outlined'
                      value={description}
                      onChange={handleDescriptionChange}
                      multiline={true}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      rows={2}
                    />
                    <Grid container item direction='row'>
                      <ProjectSelect
                        label='Difficulty'
                        listOfValues={['Beginner', 'Intermediate', 'Advanced']}
                        handleChange={changeSelect}
                      />
                      <ProjectSelect
                        label='Amount of Work'
                        listOfValues={['Little Work', 'Medium Work', 'Much Work']}
                        handleChange={changeSelect}
                      />
                    </Grid>
                    <PlatformGridList
                      cols={3}
                      spacing={1}
                      cellHeight={60}
                      justify='flex-start'
                      style={{margin: '0.5rem'}}>
                      <GridListTile cols={3} style={{height: 40}}>
                        <PlatformsCreate>Platforms</PlatformsCreate>
                      </GridListTile>
                      {listOfPlatforms.map((checkBoxValue, i) => {
                        return (
                          <GridListTile
                            key={i}
                            cols={1}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}>
                            <FormControlLabel
                              control={
                                <PlatformCreateCheckbox
                                  name={checkBoxValue}
                                  size='small'
                                  color='primary'
                                  disableRipple={true}
                                  icon={<CheckBoxOutlineBlankSharp />}
                                  checkedIcon={<CheckBoxSharp />}
                                  onClick={handleFilterClick}
                                />
                              }
                              label={
                                <FilterStyleTypography
                                  style={{ fontSize: '0.8em' }}>
                                  {checkBoxValue}
                                </FilterStyleTypography>
                              }
                              labelPlacement='top'
                            />
                          </GridListTile>
                        );
                      })}
                    </PlatformGridList>
                  </DialogContent>
                  <DialogActions>
                    <CancelButton
                      onClick={handleClose}
                      startIcon={<DeleteIcon />}>
                      Cancel
                    </CancelButton>
                    <SaveButton onClick={handleSave} startIcon={<SaveIcon />}>
                      Save
                    </SaveButton>
                  </DialogActions>
                </Dialog>
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
