//A reducer is a function that takes the current state and the action, and returns a new state. \
//The reducer is responsible for updating the state of your app in a consistent way.
//states =[] was renamed to posts as this is a post reducer.
export default (posts =[], action) =>{//state should be equal to something, array of posts
    switch (action.type) {
        case 'FETCH_ALL'://fetching all the posts
            return action.payload;//these are the actual posts
        case 'CREATE'://create posts
            return [...posts, action.payload];
        case 'UPDATE'://update posts
            //output of map method is an array
            //if the post id == current post id then return action.payload else return the previous post
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case 'LIKE': //like posts
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case 'DELETE'://delete posts
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}