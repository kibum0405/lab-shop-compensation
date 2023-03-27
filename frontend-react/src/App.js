
import './App.css';
import React from 'react';
import TopMenu from './components/TopMenu.js';
import { Grid, Card, CardActions, CardContent, Button, Stack, Typography } from '@mui/material';
import LeftMenu from './components/LeftMenu.js'
import AppsIcon from '@mui/icons-material/Apps';
import { Route, Routes, Link } from "react-router-dom";
import OrderCards from './components/listers/OrderCards'
import InventoryCards from './components/listers/InventoryCards'
import DeliveryCards from './components/listers/DeliveryCards'

class App extends React.Component {
    constructor(props) {
		console.log("App.js")
		super(props);
		this.state = {
			menuFlag: false,
			useComponent: "",
			drawer: true,
			components: [],
			sideBar: true,
        	urlPath: "null",
		}
	}
	componentDidMount () {
		let path = document.location.href.split("#/")
		this.setState({...this.state, urlPath:path[1]});
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick = () => {
		this.setState({
			menuFlag: !this.state.menuFlag,
		})
	}
	handleProps = (name, value) => {
		this.setState({ ...this.state,
			[name]: value,
		})
	}
	changeUrl = () => {
		let path = document.location.href.split("#/")
		this.setState({...this.state, urlPath:path[0]});
	}
  render() {
    return (
      <>
        <TopMenu className="top-menu-home-icon"
			handleClick={this.handleClick}
			urlPath={this.state.urlPath}
			handleProps={this.handleProps}
		/>

        <Grid className="app-grid-main" container>
            <LeftMenu menuFlag={this.state.menuFlag} handleClick={this.handleClick}
							changeUrl={this.changeUrl}/>
            <Grid item lg={8}>
				{
                    this.state.urlPath && this.state.isCheckUrl === true ?
                    <Routes>
                        <Route path="/orders" element={<OrderCards />} />
                        <Route path="/inventories" element={<InventoryCards />} />
                        <Route path="/deliveries" element={<DeliveryCards />} />
                    </Routes>
					:
				    (
					<Stack className="app-stack-style"
						direction="row"
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Card className="app-card-style"
									variant="outlined"
								>
									<CardContent className="app-card-content-style">
										<ul className="app-ul-style">
											<Typography
												component="li"
												align="center"
											>
												<AppsIcon className="app-app-icon-style" />
											</Typography>
										</ul>
									</CardContent>
									<CardActions>
										<Button fullWidth={true} color="secondary" variant="outlined"
											onClick={this.changeUrl} component={Link} to={"/orders"}>
										Order
										</Button>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Card className="app-card-style"
									variant="outlined"
								>
									<CardContent className="app-card-content-style">
										<ul className="app-ul-style">
											<Typography
												component="li"
												align="center"
											>
												<AppsIcon className="app-app-icon-style" />
											</Typography>
										</ul>
									</CardContent>
									<CardActions>
										<Button fullWidth={true} color="secondary" variant="outlined"
											onClick={this.changeUrl} component={Link} to={"/inventories"}>
										Inventory
										</Button>
									</CardActions>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Card className="app-card-style"
									variant="outlined"
								>
									<CardContent className="app-card-content-style">
										<ul className="app-ul-style">
											<Typography
												component="li"
												align="center"
											>
												<AppsIcon className="app-app-icon-style" />
											</Typography>
										</ul>
									</CardContent>
									<CardActions>
										<Button fullWidth={true} color="secondary" variant="outlined"
											onClick={this.changeUrl} component={Link} to={"/deliveries"}>
										Delivery
										</Button>
									</CardActions>
								</Card>
							</Grid>
						</Grid>
					</Stack>
				    )
				}
			</Grid>
        </Grid>
      </>
    );
  }
}

export default App;

