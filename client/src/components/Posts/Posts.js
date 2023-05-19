import React from "react";
import { useSelector } from "react-redux";
import { Grid,CircularProgress } from "@material-ui/core";

import Post from './Post/Post.js';
//We import Post from './Post/Post.js' to make multiple componenets;
import useStyles from './styles.js';

const Posts = ({setCurrentId}) => {

    //how we fetch post from the state
    const {posts, isLoading} = useSelector((state) => state.posts); // its state.posts because in the reducer the state was renamed to posts
    const classes = useStyles();

    if(!posts.length && !isLoading) return 'No posts';

    console.log(posts);
    return (
        //if posts.length > 0 then we show the grid
        //if statement then statement else statement
        isLoading ? <CircularProgress /> :(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
                {posts.map((post) => ( //The map function is used to iterate over the posts array and render a Grid component for each post.
                    <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;