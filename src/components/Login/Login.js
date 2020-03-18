import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { Snackbar, SnackbarContent } from '@material-ui/core';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			hasRegistered: false,
			showError: false,
			showLogin: false,
			showRegister: false
		}
	}

	postApi(items, url, httpMethod) {
		var formBody = [];
		for (let [key, value] of Object.entries(items)) {
			formBody.push("${key}=${value}");
		}
		formBody = formBody.join("&");
		fetch(url+"?username="+items["username"], {
			method: httpMethod,
		}).then(res => {
            console.log("HER ER JEG")
			if (res.status === 500) {
				res.json().then(data => {
					this.setState({error: data.error, showError: true
                    }, () => {console.log(this.state)})
				});
			}else {
				res.json().then(data => {
					console.log(data)
					this.props.handler(data);
					this.setState({bruker: data})
				});
			}
			// location.reload()
		})
	}

	LogIn() {
		return (
		<div>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="username"
				label="Brukernavn"
				name="brukernavn"
				autoFocus
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				onClick={() => this.postApi({username: document.querySelector("#username").value}, this.props.server+"api/userdata/", "GET")}
			>
				Logg inn
			</Button>
            <Snackbar open={this.state.showError} autoHideDuration={6000}>
                <SnackbarContent message={this.state.error}/>
            </Snackbar>
		</div>
		)
	}

	SignIn() {
		return (
		<div>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="username"
				label="Brukernavn"
				name="brukernavn"
				autoFocus
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				onClick={() => this.postApi({username: document.querySelector("#username").value}, this.props.server+"api/users/add", "POST")}
			>
				Lag bruker
			</Button>
		</div>
		)
	}

	Onboarding() {
		return (
			<div>
				<Button onClick={() => this.setState({showLogin: true})}>
					Logg inn
				</Button>
				<Button onClick={() => this.setState({showRegister: true})}>
					Registrer bruker
				</Button>
			</div>
		)
	}

	render() {
		let loggedIn = this.state.hasRegistered ? this.LogIn() : this.SignIn();
		if (this.state.bruker) {
			return <Redirect to="/"/>
		}
		return this.state.showLogin ? this.LogIn() : this.state.showRegister ? this.SignIn(): this.Onboarding();
	}
}

export default Login;
