import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import { Container, Grid, CardHeader, CardMedia, CardActions, CardContent } from "@material-ui/core";

const SERVER_URL = "http://10.22.81.241:3000/"

class Animal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animals: []
    }
    this.fetchAnimals(SERVER_URL);
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

  render() {
    const items = this.state.animals.map((item) => 
      <Card>
        <CardHeader title={item["name"]}/>
        <CardMedia style={{height: 0, paddingTop: '56.25%'}} image={SERVER_URL+"public/"+item["id"]+".png"}></CardMedia>
  <CardContent>Pris: {item["price"]}</CardContent>
        <CardActions>
          <Button size="small" color="primary">Kjøp</Button>
          <Button size="small" color="primary">Velg</Button>
        </CardActions>
      </Card>
    );
    return this.props.bruker?.id ? <div>
        <h2>Velg dyr</h2>
        <Container maxWidth="md">
        <Grid container spacing={5} alignItems="flex-end">
          {items}
        </Grid>
      </Container>
      </div> : <Redirect to="/login"/>;
    }
  }
  

export default Animal;