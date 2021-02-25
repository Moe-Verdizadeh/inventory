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

//API Endpoint
app.get('/', (req, res) => res.status(200).send("hello"));

app.post('/inventory/item', (req, res) => {
    const dbItem = req.body.newItem;

    console.log('Inventory');
    console.log(req.body.newItem);



    Items.create( dbItem , (err , data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    Items.deleteOne({
        _id: id
    })
    .then(() => res.status(200).send({ success: `Successfully deleted ${id}`}))
    .catch(err => console.log(err));
});

app.get('/inventory/item', (req, res) => {
    Items.find((err , data) => {
        if(err){
             res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});
//listener
app.listen(port, () => console.log(`Listing on port: ${port}`))









// const express = require('express');
// const app = express();
// const expressLayouts = require('express-ejs-layouts');

// const indexRouter = require('./routes/index')

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');
// app.use(expressLayouts);
// app.use(express.static('public'));

// // const mongoose = require('mongoose');
// // DATABASE_URL = 'mongodb://localhost/inventory;'
// // mongoose.connect(process.nextTick.DATABASE_URL, { 
// //     useNewUrlParser: true
// // }); 

// // const db = mongoose.connection
// // db.on( 'error',  error => console.log(error) );
// // db.once('open', () => console.log('Connected') );

// app.use('/', indexRouter);

// app.listen(process.env.PORT || 3000);