import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();// await is used because finding things inside a model takes time so an async actions is needed that is added in the function begining
        //finds all the posts
        //console.log(postMessages);

        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;//getting the body

    const newPostMessage = new PostMessage({...post,creator: req.userId, createdAt : new Date().toISOString()});// making a post object via the PostMessage model
    try{
        await newPostMessage.save();
        
        res.status(201).json(newPostMessage);
    }catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    
    const { id : _id} = req.params;//params is getting information from the URL, the :id part
    const post = req.body;
    //checking the id in mongo db
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return  res.status(404).send('No post found with that ID');
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});//{new: true} because to make sure we can receive the updated post
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    console.log('stat');
   // console.log(req);
    console.log(id,'test');
    if (!req.userId) return res.json({ message: "Unauthenticated: Create an account"});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) =>id === String(req.userId));

    //index = -1 means user has not liked this post
    if (index === -1) {
        //like post 
        post.likes.push(req.userId);
    } else {
        //dislike post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
        //filter the persons like using the id
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true});

    res.json(updatedPost);//because we need it
}