import Inventory from '../models/inventory.js';

export const inventoryList = (req, res) => {
    Inventory.find()
    .then(data => res.status(200).send(data))
    .catch(err => console.log(err));
};

export const create = (req, res) => {
    const dbItem = req.body.newItem;

    Inventory.create( dbItem , (err , data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
};

export const destroy = (req, res) => {
    const id = req.params.id;

    Inventory.deleteOne({
        _id: id
    })
    .then(() => res.status(200).send({ success: `Successfully deleted ${id}`}))
    .catch(err => console.log(err));
};

export const show = (req, res) => {
    Inventory.findOne({
        _id: req.params.id
    })
    .then(item => {
        res.status(200).send(item);
    })
    .catch(err => console.log(err));
};

export const update = (req, res) => {
    Inventory.updateOne({
        _id: req.params.id
    }, req.body.editedItem)
    .then(() => res.status(200).send({success: "Sucessfully updated"}))
    .catch(err => console.log(err));
};