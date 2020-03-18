import React from "react";
import { Redirect } from "react-router-dom";
import { Card, CardHeader } from "@material-ui/core";

function Home(props) {
    return props.bruker?.id ?
      <div>
        <img src={props.server +"public/"+props.bruker.active.id+".png"}/>
        <Card>
          <CardHeader></CardHeader>
        </Card>
        <h2>Hei, {props.bruker.username}!</h2>
        <h2>Poeng: {props.bruker.points}</h2>
        <h2>Inventory: {props.bruker.inventory}</h2>
      </div> : <Redirect to="/login"/>;
  }

export default Home;