import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cookieParser from 'cookie-parser';   
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';



const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));


const server = http.createServer(app);

server.listen(8080,()=>{
    console.log('Server is running on port 8080');  
})


const MONGO_URI = 'mongodb+srv://ruchirkhare12:oEg8TS54njUgvqIT@cluster0.fs775mq.mongodb.net/API?retryWrites=true&w=majority&appName=Cluster0';  // mongodb connection string


mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Error:',err);
})





