import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    // name: String,
    // amountInP: String,
    // amountInOz: String
    name: String,
    amountInP: String,
    amountInOz: String
})

export default mongoose.model('Items', ItemSchema );


// [
//     {
//         "name": "Wedding cake",
//         "amountInP": "1",
//         "amountInOz": "13"
//     },
//     {
//         "name": "Cali Bubba",
//         "amountInP": "0",
//         "amountInOz": "5"
//     },
//     {
//         "name": "White Fire OG",
//         "amountInP": "3",
//         "amountInOz": "20"
//     }
// ]