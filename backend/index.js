import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//For all
app.use(cors());

//CORS for specifics
// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN stack tutorial')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });//This will connext to express server only if app was connected to database succesfully        
    })
    .catch((error) => {
        console.log(error);
    });