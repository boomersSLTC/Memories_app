import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"; //allows use to dispatch actions
import React, {useState} from "react";
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination/Pagination.jsx';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';

import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search);
} //to know which page we are

const Home = () => {
    const [currentId, setCurrentId] = useState(null);//making sure its null as we dont have the id selected
    const dispatch = useDispatch(); // Get the dispatch function from the Redux store.
    const query = useQuery();//where we get page info from
    const history = useNavigate();
    const classes = useStyles();

    const page = query.get('page') || 1// reads the url and gets the page returns 1 if no page in url
    const searchQuery = query.get('search');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const searchPost = () => {
        if(search.trim() || tags ){//trim to make sure no empty spaces
            //dispatch => fetch search posts
            dispatch(getPostsBySearch({search, tags: tags.join(',') }));//makes sure to join the array with commas
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else{
            history('/');
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === '13') {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);//we have to spread because we have a array of states
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    {/*xs is extra small devices*/}
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField 
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                onKeyDown={handleKeyDown}
                                fullWidth
                                value={search}
                                onChange={(e)=>{setSearch(e.target.value)}}
                            />
                            <ChipInput 
                                style = {{margin: '10px 0'}}
                                value = {tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label = 'Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId = {currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    ) 
}

export default Home