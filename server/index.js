import express from 'express'; //framework for routing
import bodyParser from 'body-parser'; //Enables to send post requests
import mongoose from 'mongoose'; //models for our posts
import cors from 'cors'; //allows passing 
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

//bodyparser.json transforms req.body text based input into accesible variables
//bodyparser.urlencoded does the same, extended true makes sure the req.body is any type instead of strings
app.use(bodyParser.json({ limit: "30mb", extended: true})); //limit because images are going to be sent
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

app.use(cors());
app.use('/posts', postRoutes);//everyroute inside POSTS.JS route starts with /posts
app.use('/user', userRoutes);
//const CONNECTION_URL = 'mongodb+srv://sandive:rikisandive@cluster0.0w8qjio.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
    .catch((error) => console.log(error.message));



