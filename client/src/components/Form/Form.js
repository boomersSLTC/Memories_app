import React,{ useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from './styles.js';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {

    const dispatch = useDispatch();

    //useState hook returns an array with two values: the current state and a function that can be used to update the state.
    //postData: The current state of the post data
    //sePostData: A function that can be used to update the post data
    //the initial state passed in is the object
    
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //this makes sure we find only that specific post
    const [postData, setPostData] = useState({
        title: '', message: '', tags:'', selectedFile:''
    });
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags:'', selectedFile:''})
    }

    useEffect(() => {
        if(post) setPostData(post);
    },[post])

    const handleSubmit = async (e) => {
        e.preventDefault(); //makes sure browser is not reloaded when submitted
        
        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
            clear();
        }
        else{
            dispatch(createPost({...postData,name:user?.result?.name}));
            clear();
        }
        
    };

    if(!user?.result?.name) {
        return (
            <Paper  className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' :'Creating'} a Memory</Typography>
            <TextField 
                name="title" 
                variant="outlined"
                label ="Title" 
                fullWidth 
                value={postData.title} //initial value
                //...postData makes sure that it doesnt overwrite existing textfield values of the creator
                onChange={(e) => setPostData({...postData, title: e.target.value})}//function called when initial value changes
            />
            <TextField name="message" variant="outlined" label ="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
            <TextField name="tags" variant="outlined" label ="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
            <div className={classes.fileInput}>
                <FileBase 
                    type ="file" 
                    multiple={false} //multiple because only one file is needed
                    onDone={({base64}) => setPostData({...postData, selectedFile: base64})}//based64 is the image
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;