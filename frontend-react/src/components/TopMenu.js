
import './TopMenu.css';
import React, { Component } from 'react';
import {AppBar, Stack,Toolbar, Typography} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';


class TopMenu extends Component {
    goHome = () => {
        this.props.handleProps('urlPath', null);
    }
    render() {
        const darkTheme = createTheme({
            palette: {
                primary: {
                main: '#F5F5F5',
                },
            },
        });
        return (
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static">
                    <Stack direction="row" spacing={2}>
                        <Toolbar position="fixed" disableGutters={true}>
                            <IconButton className="top-menu-left-btn"
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={this.props.handleClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div">
                                labshopcompensation
                                {
                                    this.props.urlPath?
                                    <IconButton className="top-menu-home-icon-btn"
                                        size="small"
                                        edge="start"
                                        key=""
                                        to="/"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={this.goHome}
                                    >
                                        <HomeIcon />
                                    </IconButton>
                                    :""
                                }
                            </Typography>
                        </Toolbar>
                    </Stack>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default TopMenu;