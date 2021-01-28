import React from 'react';
import {
  Typography,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Paper,
  Box
} from '@material-ui/core';
import { UPDATE_LIKE, UPDATE_BOOKMARK } from '../graphqlQueries/index';
import { useMutation } from '@apollo/client';
import {
  UpVoteButton,
  ProjectsTitleText,
  BookmarkText,
  BookmarkButton,
} from './Styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import created from '../create.svg';
import liked from '../liked.svg';
import bookmarked from '../bookmark.svg';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'

function ProjectList(props) {
  const [openDescription, setOpenDescription] = React.useState(new Array(props.projects.length).fill(false));
  const [addLike] = useMutation(UPDATE_LIKE);
  const [addBookmark] = useMutation(UPDATE_BOOKMARK);

  const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter language={language} children={value} />
    }
  }

  const clickOpenDescription = (i) => {
    const temp = [...openDescription];
    temp[i] = !temp[i];
    setOpenDescription(temp);
  };

  const getUserIdentifier = (userSub) => {
    if (userSub) {
      const capturingRegex = /^.*\|(?<identifier>.+)$/;
      const found = userSub.match(capturingRegex);
      return found.groups.identifier;
    }
  };

  const saveLike = async (projectId) => {
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    } else {
      const userId = getUserIdentifier(props.userSub);
      try {
        await addLike({ variables: { userId, projectId } });
      } catch (err) {
        console.log(err);
      }
      props.refetch();
    }
  };

  const saveBookmark = async (projectId) => {
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    } else {
      const userId = getUserIdentifier(props.userSub);
      try {
        await addBookmark({ variables: { userId, projectId } });
      } catch (err) {
        console.log(err);
      }
      props.refetch();
    }
  };

  const checkIfBookmarked = (projectBookmark, userSub) => {
    return projectBookmark.edges.some(
      (bookmark) => bookmark.node.userId === getUserIdentifier(userSub)
    );
  };

  let imageToSetForMissing;

  if(props.filterType==='upvoted'){
    imageToSetForMissing = liked;
  }
  else if(props.filterType==='bookmarked'){
    imageToSetForMissing = bookmarked;
  }
  else{
    imageToSetForMissing = created;
  }

  if(props.projects.filter(props.filterProject).length===0){
    return (
      <Paper elevation={3}>
        <Grid container alignItems="center" justify="center" direction="column" style={{backgroundColor: 'white', height: '55vh'}}>
          <Grid item>
            <br/>
            <img src={imageToSetForMissing} alt={`${props.filterType} is missing.`} style={{marginLeft: imageToSetForMissing===created ? '35px' : null, height: '18vh'}}/>
            <br/><br/>
          </Grid>
          <Grid item>
            <ProjectsTitleText>No projects {props.filterType} yet.</ProjectsTitleText>
          </Grid>
          <br/>
        </Grid>
      </Paper>
    )
  }

  return (
    <List style={{ padding: '0', backgroundColor: 'transparent' }}>
      {props.projects
        .filter(props.filterProject)
        .map((project, i) => (
      <ListItem
        style={{
          backgroundColor: 'white',
          border: '1px solid #D6D9D9',
          borderRadius: '4px',
          paddingTop: '1rem',
          margin: i !== 0 ? '5px 0' : null,
        }}
        key={project.node.id}
        alignItems='flex-start'
        onClick={() => clickOpenDescription(i)}>
        <ListItemIcon>
          <UpVoteButton
            onClick={(event) => {
              event.stopPropagation();
              saveLike(project.node.id);
            }}
            isLiked={project.node.projectLikes.edges.some(
              (like) => like.node.userId === getUserIdentifier(props.userSub)
            )}>
            <Grid
              container
              direction='column'
              alignContent='center'
              alignItems='center'>
              <ArrowDropUpIcon
                fontSize='large'
                style={{
                  color: project.node.projectLikes.edges.some(
                    (like) =>
                      like.node.userId === getUserIdentifier(props.userSub)
                  )
                    ? 'white'
                    : '#808080',
                  fontSize: '3.5em',
                  margin: '-10px',
                  padding: 0,
                }}
              />
              <Typography
                style={{
                  marginTop: '-6px',
                  padding: 0,
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                  fontSize: '1.25em',
                }}>
                {project.node.projectLikes.edges.length}
              </Typography>
            </Grid>
          </UpVoteButton>
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          primary={
            <ProjectsTitleText>{project.node.title}</ProjectsTitleText>
          }
          secondary={
            <React.Fragment>
              <BookmarkButton
                isBookmarked={checkIfBookmarked(
                  project.node.projectBookmark,
                  props.userSub
                )}
                disableRipple={true}
                onClick={(event) => {
                  event.stopPropagation();
                  saveBookmark(project.node.id);
                }}>
                <BookmarkIcon
                  style={{
                    fontSize: '1.2rem',
                  }}
                />
                <BookmarkText>
                  {checkIfBookmarked(
                    project.node.projectBookmark,
                    props.userSub
                  )
                    ? 'Bookmarked'
                    : 'Bookmark'}
                </BookmarkText>
              </BookmarkButton>
              <br />
              <Collapse in={openDescription[i]}>
                <Box style={{marginLeft: '1rem'}}>
                  <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                    {project.node.description}
                  </ReactMarkdown>
                </Box>
              </Collapse>
            </React.Fragment>
          }
        />
      </ListItem>
      ))}
      <br/>
    </List>
  );
}

export default ProjectList;
