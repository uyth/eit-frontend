import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import { Card, CardHeader, CardMedia, CardContent, List, ListItem, ListItemText } from "@material-ui/core";
import Button from '@material-ui/core/Button';

function Home(props) {
    const [user, setUser] = useState({id:0});
    const [update, setUpdate] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(props.server+"api/items", {
			method: "GET",
		}).then(res => {
			if (res.status === 500) {
				res.json().then(data => {
					console.warn(data.error)
				});
			}else {
				res.json().then(data => {
                    setItems(data.items)
				});
			}
		})
    }, [])

    useEffect(() => {
        fetch(props.server+"api/user/"+props.bruker.id, {
			method: "GET",
		}).then(res => {
			if (res.status === 500) {
				res.json().then(data => {
					console.warn(data.error)
				});
			}else {
				res.json().then(data => {
          setUpdate(false)
          setUser(data.user)
				});
			}
		})
    }, [update])


    const inventory = items.filter(x => user?.inventory?.includes(x.id)).map(item =>
        <Card className="inventoryItem">
            <CardContent className="content">
            <CardMedia style={{width: '50px', backgroundSize:'contain'}} image={props.server +"public/"+item.id+".png"}></CardMedia>
            <p style={{marginLeft:'20px'}}>{item.name}</p>
            <Button size="small" color="primary">Velg</Button>
        </CardContent>
        </Card>
    )

    const activeItem = items.filter(x => x.id === user?.active?.id).map(item =>
        <Card className="SelectedItem">
            <CardContent className="content">
            <CardMedia style={{width: '50px', backgroundSize:'contain'}} image={props.server +"public/"+item.id+".png"}></CardMedia>
        <p style={{marginLeft:'20px'}}>{item.name}</p>
        </CardContent>
        </Card>
    )
    console.log(items[0]?.id)
    return props.bruker?.id ?
        user.id?
    <div>
        {activeItem}
        <h2>Hei, {user.username}!</h2>
        <h2>Poeng: {user.points}</h2>
    <h2>Inventory</h2>
    <div className="inventoryContainer">
    <List dense>
        {inventory}
    </List>
    </div>
    </div> : <p> Loading </p> : <Redirect to="/login"/>;
  }

export default Home;
