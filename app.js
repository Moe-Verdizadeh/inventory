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
app.get('/', (req, res) => res.status(200).send("hello"));

/////// Post New Item
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
/////// Delete Item
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    Items.deleteOne({
        _id: id
    })
    .then(() => res.status(200).send({ success: `Successfully deleted ${id}`}))
    .catch(err => console.log(err));
});

app.get('/inventory', (req, res) => {
    Items.find((err , data) => {
        if(err){
             res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});
/////// Get Item by Id
app.get('/inventory/item/:id', (req, res) => {
    Items.findOne({
        _id: req.params.id
    })
    .then(item => {
        res.status(200).send(item);
    })
    .catch(err => console.log(err));
});
/////// update Item by id
app.put('/inventory/item/:id', (req, res) => {
    Items.updateOne({
        _id: req.params.id
    }, req.body.editedItem)
    .then(() => res.status(200).send({success: "Sucessfully updated"}))
    .catch(err => console.log(err));
});
//listener
app.listen(port, () => console.log(`Listing on port: ${port}`))






