import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Items from './models/inventory.js';

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

//login handler
app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

//API Endpoint
import routes from './routes.js';
app.use('/', routes);

//listener
app.listen(port, () => console.log(`Listing on port: ${port}`));