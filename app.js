import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

export const jwtSecret = "my_secret";

//app config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = 'mongodb+srv://mokode:TeddyMo3@inventory-project.bcxkk.mongodb.net/inventoryDb?retryWrites=true&w=majority'

//middleware
app.use(express.json());
app.use(cors());
 
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoint
import routes from './routes.js';
app.use('/', routes);

//listener
app.listen(port, () => console.log(`Listing on port: ${port}`));