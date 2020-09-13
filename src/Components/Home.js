import React from 'react'
import GET_ALL_PROJECTS from '../graphqlQueries/graphqlProjectQueries'
import {Typography, Button, Grid, List, ListItem, ListItemIcon, withStyles, ListItemText} from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import '../index.css'
import { Query } from 'react-apollo'
import { withAuth0 } from '@auth0/auth0-react'
import Loading from './Loading'
import AppBar from './AppBar'
import ListOfCheckBoxes from './ListOfCheckBoxes'
import BookmarkIcon from '@material-ui/icons/Bookmark';

const FilterStyleTypography = withStyles({
    root: {
        fontFamily: 'Montserrat',
        paddingLeft: '0px',
        color: 'black'
    }
})(Typography);

const ProjectsTitleText = withStyles({
    root: {
        fontFamily: 'Montserrat',
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '1rem',
        fontWeight: 'bolder'
    }
})(Typography);

const ProjectsSubText = withStyles({
    root: {
        fontFamily: 'Montserrat',
        color: '#7B7B7B',
        fontWeight: 'lighter',
        fontSize: '0.75rem'

    }
})(Typography);

const BookmarkButton = withStyles({
    root: {
        color: '#9E9E9E',
        fontFamily: 'Montserrat',
        fontSize: '0.625rem',
        border: 'none',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
})(Button);


function Home(props){

  // handleSubmit = event => {
  //   React.useEffect(() => {

  //   })
  // }

    const getUserIdentifier = userSub => {
        const capturingRegex = /^.*\|(?<identifier>.+)$/
        const found = userSub.match(capturingRegex);
        return found.groups.identifier
    }

    document.body.style.backgroundColor = '#EDF0F1'

    return (
        <div className="App">
        <Query query={GET_ALL_PROJECTS}>
            {({loading, error, data}) => {
                const { user, isLoading, isAuthenticated } = props.auth0;
                if (loading || (isLoading && isAuthenticated)) return <Loading/>
                if (error) return <p>Error {console.log(error)}</p>;

                let dataCleaned = data.allProjects.edges
                return (
                    <div>
                    <AppBar user={user}/>
                    <Grid container justify="center" direction="row" alignItems="center" spacing={2} style={{height: '80vh', width: '65%', margin: '0 auto'}}>
                        <Grid item xs={3} style={{border: '1px solid #007AFE', borderRadius: '4px', height: '60vh', maxWidth: '400px', backgroundColor: '#F4F7FB', padding: '0'}}>
                            <List style={{paddingTop: '0px', width: '100%', height: '100%'}}>
                                <ListItem  alignItems="flex-start" style={{borderBottom: '1.5px solid #B1D6FF', width:'90%', paddingLeft: '0', paddingBottom: '5px', paddingTop: '10px', margin: '0 auto'}}>
                                    <FilterStyleTypography style={{fontWeight: 'bolder', fontSize: '1em'}}>Filter Projects</FilterStyleTypography>
                                </ListItem>
                                <ListOfCheckBoxes listOfCheckBoxLabel={["Mobile", "Frontend", "Backend", "Embedded", "Desktop", "Blockchain", "AI/ML", "Developer Tooling", "AR/VR", "Bots"]} categoryTitle="Platform"/>
                                <ListOfCheckBoxes listOfCheckBoxLabel={["Small", "Intermidiate", "Advanced"]} categoryTitle="Difficulty"/>
                            </List>
                        </Grid>
                        <Grid item xs={9} style={{height: '60vh', padding: '0'}}>
                        <List style={{padding: '0', marginLeft: 8}}>
                            {dataCleaned.map((project, i) => (
                            <ListItem style={{backgroundColor: 'white', border: '1px solid #D6D9D9', borderRadius: '4px', margin: dataCleaned[0]!==project ? '5px 0' : null}} key={project.node.id} alignItems="center">
                                <ListItemIcon>
                                <Button style={{backgroundColor: '#EEEEEE'}}>
                                    <Grid container direction='column' alignContent='center' alignItems='center' style={{margin: 0}}>
                                    <ArrowDropUpIcon fontSize='large' style={{color: '#808080', fontSize: '3.5em', margin: '-10px', padding: 0}}/>
                                    <Typography style={{marginTop: '-6px', padding: 0, fontFamily:'Montserrat', fontWeight: 'bold', fontSize: '1.25em'}}>{project.node.projectLikes.edges.length}</Typography>
                                    </Grid>
                                </Button>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<ProjectsTitleText>{project.node.title}</ProjectsTitleText>}
                                    secondary={
                                        <React.Fragment>
                                            <BookmarkButton style={{display: 'flex'}} disableRipple={true}>
                                                <BookmarkIcon style={{fontSize: '1.2rem'}}/>
                                                <ProjectsSubText style={{fontWeight: 'bold'}}>Bookmark</ProjectsSubText>
                                            </BookmarkButton>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            ))}
                        </List>
                        </Grid>
                    </Grid>
                    </div>
                )
            }}
        </Query>
        </div>
    );
}

export default withAuth0(Home);