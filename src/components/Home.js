import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import { Card, Badge, Slider, Avatar, Box, CardHeader, CardMedia, CardContent, List, ListItem, ListItemText } from "@material-ui/core";
import Button from '@material-ui/core/Button';

function Home(props) {
    const [user, setUser] = useState({id:0});
    const [update, setUpdate] = useState(true);
    const [items, setItems] = useState([]);
    const [forestCell, setCell] = useState(1);

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

    let postApi = function (url, items) {
        var formBody = [];
        for (let [key, value] of Object.entries(items)) {
            formBody.push(key+'='+value);
        }
        formBody = formBody.join("&");
        fetch(props.server+url+'?'+formBody, {
            method: 'POST',
        }).then(res => {
            if (res.status === 500) {
                console.log('POST failed')
            }
            // this.fetchUser(this.props.server, this.props.bruker.id)
            setUpdate(true)
        })
    }
    const inventory = items.filter(x => user?.inventory?.includes(x.id)).map(item =>
        <Card className="inventoryItem">
            <CardContent className="content">
            <CardMedia style={{width: '50px', backgroundSize:'contain'}} image={props.server +"public/"+item.id+".png"}></CardMedia>
            <p style={{marginLeft:'20px'}}>{item.name}</p>
            <Button size="small" onClick={() => postApi('api/forest/place-animal', {'uid':user.id, 'itemid':item.id})} color="primary" disabled={user.active?.id === item.id}>Velg</Button>
        </CardContent>
        </Card>
    )

    const activeItem = items.filter(x => x.id === user?.active?.id).map(item =>
        <Card className="SelectedItem">
            <CardContent className="content">
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    badgeContent={user.active.cell ? String(parseInt(user.active.cell)+1) : ''}
                    invisible={!user.active.cell}
                    color="primary"
                    >
                <CardMedia style={{width: '50px', backgroundSize:'contain'}} image={props.server +"public/"+item.id+".png"}></CardMedia>
            </Badge>
            <p style={{marginLeft:'20px'}}>{item.name}</p>
        </CardContent>

        </Card>
    )
    return props.bruker?.id ?
        user.id?
    <div>
    <Card className ="userCard">
        <Box className="userInfo">
            <Avatar> {user.username.charAt(0).toUpperCase()} </Avatar>
            <Box className = "userText">
                <h3 className="userHeader">{user.username}</h3>
                <p className="userSubHeader">{user.points} poeng </p>
            </Box>
        </Box>
    <Box className="activeAnimalContainer">
        {activeItem}
    </Box>
    </Card>
    <Box style={{marginLeft:'20px', marginRight:'20px'}}>
        <h3>Velg skogområde</h3>
        <Slider
            value={forestCell}
            step={1}
            marks={[{value:20}, {value:40}, {value:60}]}
            min={1}
            max={64}
            id="testId"
            onChange={(e, v) => {setCell(v)}}
            valueLabelDisplay="auto"
        />
        <Button variant="outlined" color="primary" onClick={() => postApi('api/forest/place-animal', {'uid':user.id, 'itemid':user.active.id, 'cell':forestCell-1})}>
          Velg område {forestCell}
        </Button>
    </Box>
    <h2>Inventory</h2>
    <div className="inventoryContainer">
    <List dense>
        {inventory}
    </List>
    </div>
    </div> : <p> Loading </p> : <Redirect to="/login"/>;
  }

export default Home;
