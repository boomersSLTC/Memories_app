import express from 'express';
import { getPosts,createPosts,updatePost,deletePost,likePost } from '../controllers/posts.js'; //parenthesis because default is not used
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',getPosts);
router.post('/',auth,createPosts);
router.patch('/:id',auth,updatePost);//id because we need to know the post we are updating
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth,likePost);

export default router;