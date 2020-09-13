import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "./Components/Loading";

const GuardedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () =>  {
        return <Loading/>
    },
    })}
    {...args}
  />
);

export default GuardedRoute;