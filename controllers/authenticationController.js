import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const jwtSecret = "my_secret"

export const userLogin = (req, res) => { 
    User.create('/', () =>{
        const { userName, email, password } = req.body;
        // simple validation
        if(!userName || !email || !password){
            return res.status(400).json({ msg: 'Please Enter All Required Fields'});
        }
        User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User Already Exists'});
    
            const newUserName = new User({
                userName,
                email,
                password
            });
            //create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUserName.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUserName.password = hash;
                    newUserName.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            jwtSecret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        userName: user.userName,
                                        email: user.email 
                                    }
                                });
                            }
                        ); 
                    });
                });
            });
        });
    })
}; 
 