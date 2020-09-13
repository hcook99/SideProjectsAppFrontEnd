import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "./AppBar"
import { Grid } from "@material-ui/core"

function UserPage(){

    const { user } = useAuth0();

    return (
        <div>
           <AppBar user={user}/>

           <Grid container>
                
           </Grid>
        </div>
    )
}

export default UserPage