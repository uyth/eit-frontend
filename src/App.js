import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Login from './components/Login/Login';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Animal from './components/Animal';

const SERVER_URL = "http://localhost:3000/"

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: 'white',
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


function heartbeatApi(uid) {
  let date = new Date().getTime();
  fetch(SERVER_URL+"api/heartbeat?uid="+uid+"&date="+date, {method: "POST"}).then(res => {
    res.json().then(data => console.log(data))}  
  )
}

function App() {

  const classes = useStyles();
  const [value, setValue] = useState("home");
  

  const [bruker, setBruker] = useState(
    JSON.parse(localStorage.getItem("bruker")) || {}
  );

  React.useEffect(() => {
      localStorage.setItem("bruker", JSON.stringify(bruker))
  }, [bruker]);

  const signinHandler = (bruker) => {
    localStorage.setItem("bruker", JSON.stringify(bruker));
    setBruker(bruker);
    heartbeatApi(bruker.id);
  }

  const logoutHandler = () => {
    localStorage.removeItem("bruker");
    setBruker({});
    setValue("home");
    console.log("logger ut");
  }

  const handleMenuChange = (menuChoice) => {
    setValue(menuChoice);
  }

  setInterval(() => {
    if (bruker != {}) {
      heartbeatApi(bruker.id)
    }
  }, 5000);

  return <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Klimagotchi
        </Typography>
      </Toolbar>
    </AppBar>
    <Router>
      <NavBar handler={handleMenuChange} bruker={bruker} classes={classes} value={value}/>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/dyr">
          <Animal bruker={bruker} server={SERVER_URL} className="display"/>
        </Route>
        <Route path="/login">
          <Login handler={signinHandler} server={SERVER_URL} className="display"/>
        </Route>
        <Route path="/logout">
          <Logout handler={logoutHandler} className="display"/>
        </Route>
        <Route path="/">
          <Home bruker={bruker} server={SERVER_URL} className="display"/>
        </Route>
      </Switch>
    </Router>
  </div>;
}

export default App;
