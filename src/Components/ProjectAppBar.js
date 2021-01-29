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
} from '@material-ui/core';
import {
  ProjectTextField,
  CreateButton,
  CreateProjectTitle,
  SaveButton,
  CancelButton,
  TagToolTip,
} from './Styles';
import logo from '../ideas.svg';
import AddIcon from '@material-ui/icons/Add';
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
  const [platform, setPlatform] = React.useState('');
  const [amountOfWork, setAmountOfWork] = React.useState('');
  const [createProject] = useMutation(CREATE_PROJECT);

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
    }else{
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setDifficulty('');
    setPlatform('');
    setAmountOfWork('');
    setTags('');
  };

  const handleSave = async () => {
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    }else{
      let arrayOfTags = tags.split(',');
      const userId = getUserIdentifier(props.user.sub);
      arrayOfTags = arrayOfTags.map((tag) => tag.trim());
      arrayOfTags = arrayOfTags.filter((tag) => tag.length > 0);
      await createProject({
        variables: {
          title,
          description,
          creatorUserId: userId,
          difficulty,
          platform,
          amountOfWork,
          tags: arrayOfTags,
        },
      });
      handleClose();
      props.handleCreateProject();
    }
  };

  const changeSelect = (label, value) => {
    switch (label) {
      case 'Difficulty':
        setDifficulty(value);
        break;
      case 'Platform':
        setPlatform(value);
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
        style={{ backgroundColor: 'white', boxShadow: '0.2px' }}>
        <Toolbar>
          <Grid container>
            <Grid
              container
              item
              xs={9}
              direction='row'
              alignItems='center'
              onClick={goToHomePage}>
              <Icon style={{ fontSize: '2.5em' }}>
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
                  fontSize: '1.25rem'
                }}>
                Side
                <br />
                Projects
              </Typography>
              <ProjectTextField
                id='standard-basic'
                placeholder='Search...'
                style={{
                  width: '65vh',
                  marginLeft: '2em',
                  border: '3px',
                  visibility: props.isUserPage ? 'hidden' : null
                }}
                name='search'
                variant='outlined'
                value={search}
                onChange={changeHandler}
                inputProps={{
                  style: {
                    paddingTop: '1.5vh',
                    paddingBottom: '1.5vh',
                  },
                }}
              />
            </Grid>
            <Grid
              container
              item
              alignItems='center'
              justify='flex-end'
              direction='row'
              xs={3}>
              <CreateButton onClick={handleOpen} style={{ visibility: props.isUserPage ? 'hidden' : null }}>
                <AddIcon />
                Create a project
              </CreateButton>
              <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth='sm'>
                <CreateProjectTitle disableTypography={true}>
                  Create Project
                </CreateProjectTitle>
                <DialogContent
                  style={{ marginLeft: '1rem', marginRight: '4rem' }}>
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
                  <ProjectSelect
                    label='Difficulty'
                    listOfValues={['Beginner', 'Intermidiate', 'Advanced']}
                    handleChange={changeSelect}
                  />
                  <ProjectSelect
                    label='Platform'
                    listOfValues={[
                      'Mobile',
                      'Frontend',
                      'Backend',
                      'Embedded',
                      'Desktop',
                      'Blockchain',
                      'AI/ML',
                      'Developer Tooling',
                      'AR/VR',
                      'Bots',
                      'Other'
                    ]}
                    handleChange={changeSelect}
                  />
                  <ProjectSelect
                    label='Amount of Work'
                    listOfValues={['Little Work', 'Medium Work', 'Much Work']}
                    handleChange={changeSelect}
                  />
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
              {props.user ? (
                <UserIconMenu
                  username={props.user.nickname}
                  userPicture={props.user.picture}
                />
              ) : (
                <LoginButton />
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default withRouter(ProjectAppBar);
