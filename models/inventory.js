import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: String,
    amountInP: String,
    amountInOz: String 
});

export default mongoose.model('Items', ItemSchema);

 