import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
  
import { BottomNavigation, AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    }
});

class Navbar extends Component {

    constructor(props) {
        super(props);
    }
  
    render() {
        const handleChange = (event, newValue) => {
            console.log(newValue);
            console.log(this.props.value);
            this.props.handler(newValue);
        };

        if (JSON.stringify(this.props.bruker)==="{}") {
            return null;
        }
    
        return <BottomNavigation value={this.props.value} onChange={handleChange} showLabels className={this.props.classes.stickToBottom}>
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
            to="/logout"
            label="Logg ut"
            value="authentication"
            icon={<PersonIcon/>}
        />
        </BottomNavigation>
  }
}

export default Navbar;