import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    logout() {
        this.props.handler();
    }

    render() {
        return localStorage.getItem("bruker") === null ? <Redirect to="/"/>
        : <div>
            <br/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.logout()}
            >
                Logg ut
            </Button>
        </div>;
    }
}

export default Logout;