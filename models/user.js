import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    }

});

export default mongoose.model('User', UserSchema);