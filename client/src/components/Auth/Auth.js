import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {GoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {useNavigate} from  'react-router-dom';
import decode from 'jwt-decode';
import {signin, signup} from '../../actions/auth';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword: ''};

const Auth = () => {
    
    const classes = useStyles();
    const [showpassword,setshowpassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setshowpassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData, history));//if something happens we can navigate so we pass the history as well
        }
        else{
            dispatch(signin(formData, history))
        }
    };
    //handle change because to make sure we dont have to make different functions for each input field
    const handleChange = (e) => {
        //e.target.name cause each input has a specific name and we assign them from the value of the input
        setFormData({ ...formData, [e.target.name]:e.target.value });
    };    

    const switchMode = () => {
       setIsSignup((previsSignUp) => !previsSignUp);
       setshowpassword(false);
    };

    const googleSuccess = async (res) => {
        //the question next to res makes sure that we don't get an error in case we dont have res
        const result = decode(res?.credential);
        const token = res?.credential;

        try {
            dispatch({type: 'AUTH', data: {result,token} });

            history('/');//redirect to home page
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try again later');
    };

    return (
        <Container component="main" maxWidth = "xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange = {handleChange} autoFocus half/>
                                    <Input name='lastName' label='Last Name' handleChange = {handleChange} half/>
                                </>
                            )
                        }
                        <Input name='email' label='Email' handleChange = {handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange = {handleChange} type={showpassword ? "text" : "password"} handleShowPassword = {handleShowPassword}/>
                        { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange = {handleChange} type="password"/>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent='center'>
                        <GoogleLogin 
                                onSuccess={googleSuccess}
                                onError={googleFailure}
                                cookePolicy='single_host_origin'
                                width='250'
                        />
                    </Grid>
                    <Grid container justifyContent='center' className={classes.googleButton}>
                        <Grid item>
                            <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' : 'Dont have an account Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth