import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthConsumer } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <header>
            <AuthConsumer>
                {({ isAuth, login, logout }) => (
                    <div>

                        <div className={classes.root}>
                            <AppBar position="static">
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        className={classes.menuButton}
                                        color="inherit"
                                        aria-label="menu"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}>
                                        News
                                    </Typography>
                                    <Button color="inherit">Login</Button>
                                </Toolbar>
                            </AppBar>
                        </div>

                        <h3>
                            <Link to="/">
                                <Button variant="contained" color="primary">
                                    Hello World
                                </Button>
                            </Link>
                        </h3>

                        {isAuth ? (
                            <ul>
                                <Link to="/me">
                                    ME
                                </Link>
                                <button type="button" onClick={logout}>logout</button>
                            </ul>
                        ) : (
                            <button type="button" onClick={login}>login</button>
                        )}
                    </div>
                )}
            </AuthConsumer>
        </header>
    );
};
