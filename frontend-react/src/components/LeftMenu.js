
import React from 'react'
import {Box, Drawer, List, ListItem, ListItemButton} from '@mui/material/';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

class Layout extends React.Component {
    toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [anchor]: open });
    };
    render() {
        let menuFlag = this.props.menuFlag;
        let handleClick = this.props.handleClick;
        let changeUrl = this.props.changeUrl;
        return (
          <div>
            <Drawer
                anchor="left"
                open={menuFlag}
                onClose={handleClick}
            >
                <Box className="left-menu-box"
                role="presentation"
                onClick={handleClick}
                onKeyDown={handleClick}
                >
                    <List>
                        <Link onClick={changeUrl} to="/orders">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText>Order</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link onClick={changeUrl} to="/inventories">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText>Inventory</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link onClick={changeUrl} to="/deliveries">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText>Delivery</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </Drawer>
          </div>
        );
    }
}

export default Layout;