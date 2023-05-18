import axois from 'axios'

const API = axois.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        console.log(req.headers.Authorization);
    }
    return req;
});

//axois.get() - that makes an HTTP GET request to the url endpoint. 
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`,updatedPost); //id is specified becuase we want to know which post
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);