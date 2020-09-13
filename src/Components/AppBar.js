import React, {useState} from 'react'
import { Grid, Icon, AppBar, Toolbar, Typography, TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import UserIconMenu from './UserIconMenu'
import { withStyles } from '@material-ui/core/styles'
import logo from '../ideas.svg'
import AddIcon from '@material-ui/icons/Add'

const SearchBar = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#E0E3E3',
        },
        '&:hover fieldset': {
          borderColor: '#99A3AD',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#007AFE',
        }
      }
    }
})(TextField);


const StyledButton = withStyles({
    root: {
        backgroundColor: 'white',
        textTransform: 'none',
        float: 'right',
        height: '100%',
        color: '#007AFE',
        fontSize: 'bold',
        fontFamily: 'Montserrat',
        '&:hover': {
            color: 'white',
            backgroundColor: '#007AFE'
        }
    }
})(Button);

function Loading(props) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        const value = event.target.value;
        if(value === '\n'){
        }
        else{
            setSearchTerm(value)
        }
    }

    return (
        <div>
        <AppBar position="static" style={{backgroundColor: 'white', boxShadow: '0.2px'}}>
            <Toolbar>
            <Grid container>
                <Grid container item xs={9} direction="row" alignItems="center">
                <Icon style={{fontSize: '2.5em'}}>
                    <img src={logo} style={{width: '100%', height: '100%'}} alt={"Logo"}/>
                </Icon>
                <Typography style={{color: 'black', fontFamily:'Montserrat', fontWeight: 'bolder'}}>
                    Side<br/>Projects
                </Typography>
                <SearchBar id="standard-basic" 
                    placeholder="Search..." 
                    style={{width: '65vh', marginLeft: '2em', border: '3px'}}
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
                    <StyledButton>
                    <AddIcon/>
                    Create a project
                    </StyledButton>
                    {props.user ? <UserIconMenu username={props.user.nickname}/> : <LoginButton/>}
                </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <Toolbar/>
        </div>
    )
}

export default withRouter(Loading)