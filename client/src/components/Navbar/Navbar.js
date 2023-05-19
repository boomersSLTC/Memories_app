import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import {useNavigate, useLocation} from  'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () =>{
        dispatch({type:'LOGOUT'})

        setUser(null);
        history('/auth');
    };

    useEffect(() => {
        const token = user?.token;
        
        if(token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]); //making sure we dont have to refresh after login to get the details right
    //location changes set the user
    return (
        <AppBar className={classes.appBar} position='static' color="inherit">
            <Link to='/' className={classes.brandContainer}>
                <img src = {memoriesText} alt ="icon" height="45px"></img>
                <img className={classes.image} src = {memoriesLogo} alt ="icon" height="40px"></img>
            </Link>
            <Toolbar className={classes.toolbar} >
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
                            {user.result.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className ={classes.logout} color = 'secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component = { Link } to ="/auth" variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;