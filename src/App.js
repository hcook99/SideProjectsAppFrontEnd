import React from 'react';
import Home from './Components/Home';
import UserPage from './Components/UserPage';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import GuardedRoute from './GuardedRoute';

function App() {

  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  window.isMobile = windowSize.width <= 500;

  return (
    <div style={{width: "100%"}}>
      <Router>
        <Route exact path='/' component={Home} />
        <GuardedRoute exact path='/user' component={UserPage} />
      </Router>
    </div>
  );
}

export default App;
