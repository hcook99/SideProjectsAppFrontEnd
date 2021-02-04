import React from 'react';
import { GET_ALL_PROJECTS } from '../graphqlQueries/index';
import { Grid, List, ListItem } from '@material-ui/core';
import '../index.css';
import { useQuery } from '@apollo/client';
import { withAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import ListOfCheckBoxes from './ListOfCheckBoxes';
import { useAuth0 } from '@auth0/auth0-react';
import ProjectAppBar from './ProjectAppBar';
import ProjectList from './ProjectList';
import { FilterStyleTypography } from './Styles';

function Home() {
  const [search, setSearch] = React.useState('');
  const [platforms, setPlatforms] = React.useState([]);
  const [difficulties, setDifficulties] = React.useState([]);
  const [amountOfWork, setAmountOfWork] = React.useState([]);
  const [tagClick, setTagClick] = React.useState(false);

  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  const { loading, error, data, refetch } = useQuery(GET_ALL_PROJECTS);

  if (loading || isLoading) return <Loading />;
  if (error) return <p>Error {console.log(error)}</p>;

  const changeSearch = (newSearch) => {
    setSearch(newSearch);
    setTagClick(false);
  };

  const changeSelectors = (name, value, category) => {
    switch (category) {
      case 'Platform':
        value
          ? setPlatforms((platforms) => platforms.concat(name))
          : setPlatforms((platforms) =>
              platforms.filter((platform) => name !== platform)
            );
        break;
      case 'Difficulty':
        value
          ? setDifficulties((difficulties) =>
              difficulties.concat(name.toLowerCase())
            )
          : setDifficulties((difficulties) =>
              difficulties.filter(
                (difficulty) => name.toLowerCase() !== difficulty
              )
            );
        break;
      case 'Amount of Work':
        value
          ? setAmountOfWork((amountOfWork) =>
              amountOfWork.concat(name.replace(' Work', '').toLowerCase())
            )
          : setAmountOfWork((amountOfWork) =>
              amountOfWork.filter(
                (work) => name.replace(' Work', '').toLowerCase() !== work
              )
            );
        break;
      default:
        return;
    }
  };

  const searchTag = (tag) => {
    setSearch(tag);
    setTagClick(true);
  }

  const filterWithTags = (value) => {
    return (
      value.node.tags.some(
        (tag) => tag.toLowerCase() === search.toLowerCase()
      )
    )
  }

  const filterProject = (value) => {
    return (
      (value.node.title.toLowerCase().includes(search.toLowerCase()) ||
        value.node.description.toLowerCase().includes(search.toLowerCase()) ||
        value.node.tags.some(
          (tag) => tag.toLowerCase() === search.toLowerCase()
        )) &&
      (platforms.some((platform) => value.node.platforms.includes(platform)) ||
        platforms.length === 0) &&
      (difficulties.includes(value.node.difficulty.toLowerCase()) ||
        difficulties.length === 0) &&
      (amountOfWork.includes(value.node.amountOfWork.toLowerCase()) ||
        amountOfWork.length === 0)
    );
  };

  const handleCreate = () => {
    refetch();
  };

  let dataCleaned = data.allProjects.edges;

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
        spacing={2}
        style={{
          height: '80vh',
          width: '65%',
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
              listOfCheckBoxLabel={[
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
                'Other',
              ]}
              categoryTitle='Platform'
              changeSelection={changeSelectors}
            />
            <ListOfCheckBoxes
              listOfCheckBoxLabel={['Beginner', 'Intermidiate', 'Advanced']}
              categoryTitle='Difficulty'
              changeSelection={changeSelectors}
            />
            <ListOfCheckBoxes
              listOfCheckBoxLabel={['Little Work', 'Medium Work', 'Much Work']}
              categoryTitle='Amount of Work'
              changeSelection={changeSelectors}
            />
          </List>
        </Grid>
        <Grid
          item
          xs={8}
          style={{ height: '60vh', padding: '0', marginLeft: '10px' }}>
          <ProjectList
            projects={dataCleaned}
            disableTags={false}
            searchTag={searchTag}
            filterProject={tagClick ? filterWithTags : filterProject}
            userSub={user ? user.sub : null}
            isAuthenticated={isAuthenticated}
            loginWithRedirect={() => loginWithRedirect()}
            refetch={() => refetch()}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withAuth0(Home);
