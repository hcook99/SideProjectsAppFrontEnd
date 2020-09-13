import React from 'react';
import Home from './Components/Home';
import UserPage from './Components/UserPage'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import GuardedRoute from './GuardedRoute';

function App(){
  return (
    <div>
      <Router>
        <Route exact path='/' component={Home} />
        <GuardedRoute exact path='/:userName' component={UserPage}/>
      </Router>
    </div>
  );
}

export default App;