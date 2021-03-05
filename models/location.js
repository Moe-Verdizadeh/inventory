import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    locationName:{
        type: String,
        required: true
    },  

});

export default mongoose.model('location', LocationSchema);