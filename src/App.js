import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_ALL_PROJECTS from './graphqlQueries/graphqlProjectQueries'
import { AppBar, Toolbar, Typography, Icon, TextField, Button, Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import './index.css'
import logo from './ideas.svg'

const SearchBar = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#B4BDC3',
      },
      '&:hover fieldset': {
        borderColor: '#B4BDC3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3C4ADF',
      },
    },
  }
})(TextField);

function App(){
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS);
  let dataCleaned;
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = event => {
    if(event.target.value == '\n'){
    }
    else{
      setSearchTerm(event.target.value);
    }
  };

  // handleSubmit = event => {
  //   React.useEffect(() => {

  //   })
  // }

  document.body.style.backgroundColor = '#EDF0F1'

  if (loading) return <body style={{'display': 'grid', 'height': '100vh', margin: 0, placeItems: 'center center'}}><p>Loading...</p></body>
if (error) return <p>Error {console.log(error)}</p>;

  if(data){
    dataCleaned = data.allProjects.edges
  }

  return (
    <div className="App">
      <AppBar position="static" style={{backgroundColor: 'white', boxShadow: '0.2px'}}>
        <Toolbar>
          <Grid container>
            <Grid container item xs={9} direction="row" alignItems="center">
              <Icon style={{fontSize: '2.5em'}}>
                <img src={logo} style={{width: '100%', height: '100%'}}/>
              </Icon>
              <Typography style={{color: 'black', fontFamily:'Montserrat', fontWeight: 'bolder'}}>
                Side<br/>Projects
              </Typography>
              <SearchBar id="standard-basic" 
                placeholder="Search..." 
                style={{width: '65vh', marginLeft: '2em'}}
                name="search"
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                inputProps={{
                  style: {
                    paddingTop: '1.5vh',
                    paddingBottom: '1.5vh'
                  },
                }}
                />
              </Grid>
              <Grid container item alignItems="center" justify="flex-end" direction="row" xs={3}>
                <Button style={{backgroundColor: '#3C4ADF', textTransform: 'none', float: 'right', height: '100%'}}>
                  <Typography style={{color: 'white', fontFamily:'Montserrat', fontWeight: 'bold', fontSize: '1.0em'}}>
                    Create a project
                  </Typography>
                </Button>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Grid container style={{width: '90%'}}>
        <Grid item xs={3} style={{backgroundColor: 'gray'}}>

        </Grid>
        <Grid item xs={9} style={{backgroundColor: 'blue'}}>
                
        </Grid>
      </Grid>
    </div>
  );
}

export default App;