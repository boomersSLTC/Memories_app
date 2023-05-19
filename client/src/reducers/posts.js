//A reducer is a function that takes the current state and the action, and returns a new state. \
//The reducer is responsible for updating the state of your app in a consistent way.
//states =[] was reposts.named to posts as this is a post reducer.
export default (state = {isLoading:true, posts: []}, action) =>{//state should be equal to something, array of posts
    switch (action.type) {
        case 'START_LOADING':
            return {...state, isLoading: true};
        case 'END_LOADING':
            return {...state, isLoading: false};
        case 'FETCH_ALL'://fetching all the posts
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };//these are the actual posts
        case 'FETCH_BY_SEARCH':
            return {
                ...state,
                posts: action.payload
            };
        case 'FETCH_POST':
            return {
                ...state,
                post: action.payload
            };
        case 'CREATE'://create posts
            return { ...state, posts: [...state.posts, action.payload] };
        case 'UPDATE'://update posts
            //output of map method is an array
            //if the post id == current post id then return action.payload else return the previous post
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case 'LIKE': //like posts
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case 'DELETE'://delete posts
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}