import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './Animal.css'

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Container, Grid, CardHeader, CardMedia, CardActions, CardContent, Chip } from "@material-ui/core";


class Animal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animals: [],
      user:{},
    }
    console.log(this.props.bruker.id)
  }
  componentDidMount() {
      this.fetchUser(this.props.server, this.props.bruker.id)
      this.fetchAnimals(this.props.server);

  }
  fetchAnimals(url) {
		fetch(url+"api/items", {
			method: "GET",
		}).then(res => {
			if (res.status === 500) {
				res.json().then(data => {
					this.setState({error: data.error})
				});
			}else {
				res.json().then(data => {
          console.log(data)
          this.setState({animals: data["items"]})
				});
			}
			// location.reload()
		})
	}
  fetchUser(url, id) {
		fetch(url+"api/user/"+id, {
			method: "GET",
		}).then(res => {
			if (res.status === 500) {
				res.json().then(data => {
					this.setState({error: data.error})
				});
			}else {
				res.json().then(data => {
          console.log("user",data.user)
          this.setState({user: data.user})
				});
			}
		})
	}
    postApi(url, items) {
        var formBody = [];
        for (let [key, value] of Object.entries(items)) {
            formBody.push(key+'='+value);
        }
        formBody = formBody.join("&");
        fetch(this.props.server+url+'?'+formBody, {
            method: 'POST',
        }).then(res => {
            if (res.status === 500) {
                console.log('POST failed')
            }
            this.fetchUser(this.props.server, this.props.bruker.id)
        })
    }
  render() {
    const inventory = this.state.user.inventory;
    const items = this.state.animals.map((item) =>
      <Card variant="outlined"
      className={(inventory.includes(item.id) ? '' : 'notBought ') + ("item_" + item.cat)}
      style={{width:'40vw', maxWidth:'160px'}}>
        <CardHeader title={item["name"]}/>
        <CardMedia style={{height: 0, paddingTop: '56.25%', backgroundSize:'contain'}} image={this.props.server+"public/"+item["id"]+".png"}></CardMedia>
          <CardContent>
            {/* Pris: {item["price"]}*/}
                <Chip variant="outlined" color="primary" label={item.price + " poeng"}/>
          </CardContent>
        <CardActions>
        {
            inventory.includes(item.id) ?
            <Button size="small" color="primary">Velg</Button> :
            <Button size="small" color="primary" disabled={this.state.user.points < item.price} onClick={() => {this.postApi('api/users/give-item',{'userid': this.state.user.id, 'itemid': item.id})}}>Kjøp</Button>
        }
        </CardActions>
      </Card>
    );

    return this.props.bruker?.id ? <div>
        <h2>Velg dyr</h2>
        <p> Du har <b>{this.state.user.points}</b> poeng </p>
        <Container maxWidth="md">
        <Grid container spacing={5} justify="center"
  alignItems="flex-start" style={{padding:'20px 0 100px 0'}}>
          {items}
        </Grid>
      </Container>
      </div> : <Redirect to="/login"/>;
    }
  }


export default Animal;
