import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Login from './components/Login/Login';
import Home from './components/Home';
import Animal from './components/Animal';

const SERVER_URL = "http://localhost:3000/"

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
});


function App() {

  const handleMenuChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState("home");

  const classes = useStyles();
  
  const [bruker, setBruker] = useState(
    JSON.parse(localStorage.getItem("bruker")) || {}
  );

  React.useEffect(() => {
      localStorage.setItem("bruker", JSON.stringify(bruker))
  }, [bruker]);

  const signinHandler = (bruker) => {
    localStorage.setItem("bruker", JSON.stringify(bruker));
    setBruker(bruker);
  }

  const MainScreen = <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Klimagotchi
        </Typography>
      </Toolbar>
    </AppBar>
    <Router>
      <BottomNavigation value={value} onChange={handleMenuChange} showLabels className={classes.stickToBottom}>
      <BottomNavigationAction 
        component={Link}
        to="/"
        label="Home"
        value="home"
        icon={<HomeIcon/>}
      />
      <BottomNavigationAction 
        component={Link}
        to="/dyr"
        label="Dyr"
        value="customize"
        icon={<PetsIcon/>}
      />
      <BottomNavigationAction 
        component={Link}
        to="/login"
        label="Login"
        value="login"
        icon={<PersonIcon/>}
      />
    </BottomNavigation>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/dyr">
          <Animal bruker={bruker} server={SERVER_URL} className="display"/>
        </Route>
        <Route path="/login">
          <Login handler={signinHandler} server={SERVER_URL} className="display"/>
        </Route>
        <Route path="/">
          <Home bruker={bruker} server={SERVER_URL} className="display"/>
        </Route>
      </Switch>
  </Router>
  </div>;

  return MainScreen;
}

export default App;
