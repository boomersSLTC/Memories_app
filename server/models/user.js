import mongoose from "mongoose";

const userSchema = mongoose.Schema({ //We Specify Each Post has these things
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
});


//to turn the schema into a model we use mongoose.model
const User = mongoose.model('User', userSchema);
//why turn into a model? because we can later on use find, create, update, delete on it easily

export default User;