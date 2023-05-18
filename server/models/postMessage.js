import mongoose from "mongoose";

const postSchema = mongoose.Schema({ //We Specify Each Post has these things
    title: String,
    message: String,
    name:String,
    creator: String,
    tags: [String],//Array of strings if [String]
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

//to turn the schema into a model we use mongoose.model
const PostMessage = mongoose.model('PostMessage', postSchema);
//why turn into a model? because we can later on use find, create, update, delete on it easily

export default PostMessage;