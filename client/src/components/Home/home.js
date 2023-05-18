import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import { useDispatch } from "react-redux"; //allows use to dispatch actions
import React, {useState, useEffect} from "react";
import { getPosts } from '../../actions/posts';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);//making sure its null as we dont have the id selected
    const dispatch = useDispatch(); // Get the dispatch function from the Redux store.

    useEffect(() => { // Create a useEffect hook.
      dispatch(getPosts());// Dispatch an action to get the posts.
    },[dispatch]); // Set the dependency array to the dispatch function.
 
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    {/*xs is extra small devices*/}
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId = {currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    ) 
}

export default Home