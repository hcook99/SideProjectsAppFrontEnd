import React from 'react';
import { Grid, List, ListItem } from '@material-ui/core';
import '../index.css';
import { withAuth0 } from '@auth0/auth0-react';
import ListOfCheckBoxes from './ListOfCheckBoxes';
import { useAuth0 } from '@auth0/auth0-react';
import ProjectAppBar from './ProjectAppBar';
import ProjectList from './ProjectList';
import { FilterStyleTypography } from './Styles';

function Home() {
  const [search, setSearch] = React.useState('');
  const [platforms, setPlatforms] = React.useState({
    'Mobile': false,
    'Frontend': false,
    'Backend': false,
    'Embedded': false,
    'Desktop': false,
    'Blockchain': false,
    'AI/ML': false,
    'Tooling': false,
    'AR/VR': false,
    'Bots': false,
    'Other': false
  });
  const [difficulties, setDifficulties] = React.useState({
    'Beginner': false,
    'Intermediate': false,
    'Advanced': false
  });
  const [amountOfWork, setAmountOfWork] = React.useState({
    'Little Work': false, 
    'Medium Work': false, 
    'Much Work': false
  });
  const [tagClick, setTagClick] = React.useState(false);

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const changeSearch = (newSearch) => {
    setSearch(newSearch);
    setTagClick(false);
  };

  const changeSelectors = (name, category) => {
    let temp;
    switch (category) {
      case 'Platform':
        temp = {...platforms}
        temp[name] = !temp[name];
        setPlatforms(temp);
        break;
      case 'Difficulty':
        temp = {...difficulties};
        temp[name] = !temp[name];
        setDifficulties(temp);
        break;
      case 'Amount of Work':
        temp = {...amountOfWork}
        temp[name] = !temp[name];
        setAmountOfWork(temp);
        break;
      default:
        return;
    }
  };

  const searchTag = (tag) => {
    setSearch(tag);
    setTagClick(true);
  };

  const clickBuiltInTag = (name, category) => {
    changeSelectors(name, category);
  };

  const handleCreate = () => {
    window.location.reload();
  };

  document.body.style.backgroundColor = '#EDF0F1';

  return (
    <div className='App'>
      <ProjectAppBar
        user={user}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        handleChange={changeSearch}
        handleCreateProject={handleCreate}
        parentSearch={search}
      />
      <Grid
        container
        justify='center'
        direction='row'
        alignItems='flex-start'
        spacing={1}
        style={{
          height: '80vh',
          width: '70%',
          margin: '0 auto',
        }}>
        <Grid
          item
          xs={3}
          style={{
            border: '1px solid #007AFE',
            borderRadius: '4px',
            height: '55vh',
            maxWidth: '250px',
            backgroundColor: '#F4F7FB',
            padding: '0',
          }}>
          <List
            style={{
              paddingTop: '0px',
              width: '100%',
              height: '98%',
              overflow: 'scroll',
            }}>
            <ListItem
              alignItems='flex-start'
              style={{
                borderBottom: '1.5px solid #B1D6FF',
                width: '90%',
                paddingLeft: '0',
                paddingBottom: '5px',
                paddingTop: '1rem',
                margin: '0 auto',
              }}>
              <FilterStyleTypography
                style={{
                  fontWeight: 'bolder',
                  fontSize: '1em',
                }}>
                Filter Projects
              </FilterStyleTypography>
            </ListItem>
            <ListOfCheckBoxes
              listOfCheckBoxLabel={platforms}
              categoryTitle='Platform'
              changeSelection={changeSelectors}
            />
            <ListOfCheckBoxes
              listOfCheckBoxLabel={difficulties}
              categoryTitle='Difficulty'
              changeSelection={changeSelectors}
            />
            <ListOfCheckBoxes
              listOfCheckBoxLabel={amountOfWork}
              categoryTitle='Amount of Work'
              changeSelection={changeSelectors}
            />
          </List>
        </Grid>
        <Grid
          container
          item
          xs={8}
          style={{ height: '60vh', padding: '0', marginLeft: '10px' }}>
          <ProjectList
            disableTags={false}
            searchTag={searchTag}
            search={search}
            platforms={platforms}
            difficulties={difficulties}
            amountOfWork={amountOfWork}
            tags={tagClick}
            clickBuiltInTag={clickBuiltInTag}
            userSub={user ? user.sub : null}
            isAuthenticated={isAuthenticated}
            loginWithRedirect={() => loginWithRedirect()}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withAuth0(Home);
