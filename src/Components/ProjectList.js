import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Typography,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Paper,
  ListItemSecondaryAction,
  DialogActions,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import {
  UPDATE_LIKE,
  UPDATE_BOOKMARK,
  GET_ALL_PROJECTS,
  DELETE_PROJECT
} from '../graphqlQueries/index';
import { useMutation, useQuery } from '@apollo/client';
import Loading from './Loading';
import {
  UpVoteButton,
  ProjectsTitleText,
  BookmarkText,
  BookmarkButton,
  ProjectsDescriptionText,
  BuiltinTags,
  Tag,
  PageCursor,
  MoreButton,
  DeleteTitle,
  CancelButton as DeleteButton,
  CancelDeleteButton
} from './Styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DeleteIcon from '@material-ui/icons/Delete';
import created from '../create.svg';
import liked from '../liked.svg';
import bookmarked from '../bookmark.svg';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const useStateWithLocalStorage = localStorageKey => {
  
  const temp = JSON.parse(sessionStorage.getItem(localStorageKey)) || ['']
  
  const [value, setValue] = React.useState(temp);
 
  React.useEffect(() => {
    sessionStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);
 
  return [value, setValue];
};

function ProjectList(props) {
  const [addLike] = useMutation(UPDATE_LIKE);
  const [addBookmark] = useMutation(UPDATE_BOOKMARK);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [openDescription, setOpenDescription] = useState([]);
  const [cursor, setCursor] = useStateWithLocalStorage('cursors');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  React.useEffect(() => {
    return () => localStorage.setItem("cursors", JSON.stringify(cursor));
  }, [cursor]);

  const flattenObjectToArray = (objectToConvert) => {
    return Object.entries(objectToConvert).filter(([key, value])=>{
      return value
    }).flat().filter(value => {
      return typeof value == 'string'
    });
  }

  const getUserIdentifier = (userSub) => {
    if (userSub) {
      const capturingRegex = /^.*\|(?<identifier>.+)$/;
      const found = userSub.match(capturingRegex);
      return found.groups.identifier;
    }
  };

  let platformFlattened = props.platforms ? flattenObjectToArray(props.platforms) : [];
  let difficultiesFlattened = props.difficulties ? flattenObjectToArray(props.difficulties) : '';
  let amountOfWorkFlattened = props.amountOfWork ? flattenObjectToArray(props.amountOfWork) : '';

  const varsForSearch = {
    title: props.tags ? '' : `%${props.search}%`,
    description: props.tags ? '' : `%${props.search}%`,
    tags: `%${props.search}%`,
    platforms: platformFlattened,
    creatorUserId: props.filterType === 'submitted' ? getUserIdentifier(props.userSub) : '',
    likeUserId: props.filterType === 'upvoted' ? getUserIdentifier(props.userSub) : '',
    bookmarkUserId: props.filterType === 'bookmarked' ? getUserIdentifier(props.userSub) : '',
    limit: props.filterType ? 100 : 10,
    after: cursor[cursor.length - 1],
  };

  if (difficultiesFlattened.length > 0) {
    varsForSearch['difficulties'] = difficultiesFlattened;
  }
  if (amountOfWorkFlattened.length > 0) {
    varsForSearch['amountOfWork'] = amountOfWorkFlattened;
  }

  const { loading, error, data, refetch } = useQuery(GET_ALL_PROJECTS, {
    variables: varsForSearch,
    onCompleted: (data) => {
      const tempArr = new Array(data.allProjects.edges.length).fill(false);
      setOpenDescription(tempArr);
    },
  });

  if (loading)
    return (
      <Grid
        alignItems='flex-start'
        justify='center'
        alignContent='flex-start'
        container
        style={{ width: '100%' }}>
        <Loading />
      </Grid>
    );
  if (error) return <p>Error {console.log(error)}</p>;

  let projects = data.allProjects.edges;

  const renderers = {
    code: ({ language, value }) => {
      return <SyntaxHighlighter language={language} children={value} />;
    },
  };

  const clickOpenDescription = (i) => {
    const temp = [...openDescription];
    temp[i] = !temp[i];
    setOpenDescription(temp);
  };

  const titleCase = (title) => {
    title = title.toLowerCase();
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const clickTag = (tag) => {
    props.searchTag(tag);
  };

  const clickBuiltInTag = (name, category) => {
    props.clickBuiltInTag(name, category);
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
      refetch();
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
      refetch();
    }
  };

  const deleteProjectDialog = async (projectId) => {
    setOpenDeleteDialog(false);
    if (!props.isAuthenticated) {
      await props.loginWithRedirect();
    } else {
      try {
        await deleteProject({ variables: { projectId } });
      } catch (err) {
        console.log(err);
      }
      if(projects.length-1===0){
        previousPage();
      }
      refetch();
    }
  }

  const checkIfBookmarked = (projectBookmark, userSub) => {
    return projectBookmark.edges.some(
      (bookmark) => bookmark.node.userId === getUserIdentifier(userSub)
    );
  };

  const nextPage = () => {
    let temp = [...cursor];
    temp.push(data.allProjects.pageInfo.endCursor);
    localStorage.setItem('cursors', JSON.stringify(temp));
    setCursor(temp);
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
    let temp = [...cursor];
    temp.pop();
    setCursor(temp);
    window.scrollTo(0, 0);
  };

  let imageToSetForMissing;

  if (props.filterType === 'upvoted') {
    imageToSetForMissing = liked;
  } else if (props.filterType === 'bookmarked') {
    imageToSetForMissing = bookmarked;
  } else {
    imageToSetForMissing = created;
  }

  if (projects.length === 0) {
    return (
      <Paper elevation={3} style={{width: '100%'}}>
        <Grid
          container
          alignItems='center'
          justify='center'
          direction='column'
          style={{ backgroundColor: 'white', height: '55vh', width: '100%' }}>
          <Grid item>
            <br />
            <img
              src={imageToSetForMissing}
              alt={`${props.filterType} is missing.`}
              style={{
                marginLeft: imageToSetForMissing === created ? '35px' : null,
                height: '18vh',
              }}
            />
            <br />
            <br />
          </Grid>
          <Grid item>
            <ProjectsTitleText>
              No projects {props.filterType} yet.
            </ProjectsTitleText>
          </Grid>
          <br />
        </Grid>
      </Paper>
    );
  }

  return (
    <List
      style={{
        padding: '0',
        backgroundColor: 'transparent',
        width: '100%',
      }}>
      {projects.map((project, i) => (
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
            style={{ marginLeft: '0.3rem' }}
            disableTypography={true}
            primary={
              <ProjectsTitleText>{project.node.title}</ProjectsTitleText>
            }
            secondary={
              <React.Fragment>
                <Grid container direction='column'>
                  <Grid container direction='row'>
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
                    <Grid container item direction='row' zeroMinWidth>
                      {project.node.platforms.map((platform, i) => {
                        return (
                          <BuiltinTags
                            key={i}
                            disableRipple={true}
                            disabled={props.disableTags}
                            onClick={(event) => {
                              event.stopPropagation();
                              clickBuiltInTag(platform, 'Platform');
                            }}>
                            {platform}
                          </BuiltinTags>
                        );
                      })}
                      <BuiltinTags
                        disableRipple={true}
                        disabled={props.disableTags}
                        onClick={(event) => {
                          event.stopPropagation();
                          clickBuiltInTag(
                            titleCase(project.node.difficulty),
                            'Difficulty'
                          );
                        }}>
                        {titleCase(project.node.difficulty)}
                      </BuiltinTags>
                      <BuiltinTags
                        disableRipple={true}
                        disabled={props.disableTags}
                        onClick={(event) => {
                          event.stopPropagation();
                          clickBuiltInTag(
                            `${titleCase(project.node.amountOfWork)} Work`,
                            'Amount of Work'
                          );
                        }}>
                        {titleCase(project.node.amountOfWork)} Work
                      </BuiltinTags>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    style={{ marginLeft: '0.7rem' }}>
                    {project.node.tags.split(',').map((tag, i) => {
                      if(tag!==''){
                        return (
                          <Tag
                            key={i}
                            disableRipple={true}
                            disabled={props.disableTags}
                            onClick={(event) => {
                              event.stopPropagation();
                              clickTag(tag);
                            }}>
                            <i>#</i>
                            {tag.trim()}
                          </Tag>
                        );
                      }
                      else {
                        return <div key={i}></div>
                      }
                    })}
                  </Grid>
                </Grid>
                <br />
                <Collapse in={openDescription[i]}>
                  <ProjectsDescriptionText component='div'>
                    <ReactMarkdown
                      plugins={[gfm]}
                      renderers={renderers}
                      children={project.node.description}
                    />
                  </ProjectsDescriptionText>
                </Collapse>
              </React.Fragment>
            }
          />
          { project.node.creatorUserId===getUserIdentifier(props.userSub) &&
           <ListItemSecondaryAction>
            <MoreButton edge="end"
             aria-label="more" 
             size='small' 
             onClick={(event)=> {
               event.stopPropagation();
               setOpenDeleteDialog(true);
              }}>
              <DeleteIcon />
            </MoreButton>
            <Dialog
              open={openDeleteDialog}
              onClose={()=>setOpenDeleteDialog(false)}  
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle>
                <DeleteTitle>Are you sure you want to delete project?</DeleteTitle>
              </DialogTitle>
              <DialogActions>
                <CancelDeleteButton onClick={()=>setOpenDeleteDialog(false)}>
                  Cancel
                </CancelDeleteButton>
                <DeleteButton
                  onClick={()=>deleteProjectDialog(project.node.id)}
                  startIcon={<DeleteIcon />} autoFocus>
                  Delete
                </DeleteButton>
              </DialogActions>
            </Dialog>
          </ListItemSecondaryAction>}
        </ListItem>
      ))}
      <ListItem>
        <Grid
          container
          item
          direction='row'
          alignItems='center'
          justify='center'>
          {cursor.length > 1 ? (
            <PageCursor onClick={previousPage}>{'<'} Previous Page</PageCursor>
          ) : null}
          {data.allProjects.pageInfo.hasNextPage ? (
            <PageCursor onClick={nextPage}>Next Page {'>'}</PageCursor>
          ) : null}
        </Grid>
      </ListItem>
      <br />
    </List>
  );
}

export default withRouter(ProjectList);
