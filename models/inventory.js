import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: String,
    amountInP: Number,
    amountInOz: Number 
});

export default mongoose.model('Items', ItemSchema);