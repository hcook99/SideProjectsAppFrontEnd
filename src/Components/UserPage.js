import React from 'react';
import PropTypes from 'prop-types';
import ProjectAppBar from './ProjectAppBar';
import { Grid, Tabs } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { UserTab } from './Styles';
import Loading from './Loading';
import ProjectList from './ProjectList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function UserPage() {
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserIdentifier = (userSub) => {
    if (userSub) {
      const capturingRegex = /^.*\|(?<identifier>.+)$/;
      const found = userSub.match(capturingRegex);
      return found.groups.identifier;
    }
  };

  const filterSubmitted = (value) => {
    return value.node.creatorUserId === getUserIdentifier(user.sub);
  };

  const filterLiked = (value) => {
    return value.node.projectLikes.edges.some(
      (like) => like.node.userId === getUserIdentifier(user.sub)
    );
  };

  const filterBookmarked = (value) => {
    return value.node.projectBookmark.edges.some(
      (bookmark) => bookmark.node.userId === getUserIdentifier(user.sub)
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <ProjectAppBar
        user={user}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        isUserPage={true}
      />
      <Grid
        container
        alignItems='center'
        alignContent='center'
        justify='center'>
        <Grid xs={6} item>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
            style={{
              backgroundColor: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
            TabIndicatorProps={{ style: { background: '#007AFE' } }}>
            <UserTab label='CREATED' {...a11yProps(0)} />
            <UserTab label='UPVOTED' {...a11yProps(1)} />
            <UserTab label='BOOKMARKED' {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ProjectList
              disableTags={true}
              filterProject={filterSubmitted}
              filterType='submitted'
              userSub={user.sub}
              isAuthenticated={isAuthenticated}
              loginWithRedirect={() => loginWithRedirect()}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProjectList
              disableTags={true}
              filterProject={filterLiked}
              filterType='upvoted'
              userSub={user.sub}
              isAuthenticated={isAuthenticated}
              loginWithRedirect={() => loginWithRedirect()}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProjectList
              disableTags={true}
              filterProject={filterBookmarked}
              filterType='bookmarked'
              userSub={user.sub}
              isAuthenticated={isAuthenticated}
              loginWithRedirect={() => loginWithRedirect()}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserPage;
