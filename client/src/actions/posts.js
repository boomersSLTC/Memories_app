import * as api from '../api'; //import everything as api
// we do this because theres a lot of posts exported from the api

// Action Creators- functions that return actions
export const getPosts = () => async (dispatch) => { //to fetch all posts time taken is long so it should be done asynchronouslyly
    //so => async (dispatch) is added, we create a function that returns another function
    try {
        //response from backend is data here, we catch that and get the posts
        const { data } = await api.fetchPosts();

        dispatch({type: "FETCH_ALL", payload: data}); //instead of returning a action, in redux thunk we dispatch the action
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => { //to create a post time taken is long so it should be done asynchronouslyly
    try {
        const {data} = await api.createPost(post);

        dispatch({type: "CREATE", payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);//We put {data} because we can get the response data immediately from that        
        
        dispatch({type: "UPDATE", payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: "DELETE", payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        
        dispatch({type: "LIKE", payload: data});
    } catch (error) {
        console.log(error);
    }
}