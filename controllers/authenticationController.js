import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  
// this needs to go .env
const TOKEN_SECRET = "my_secret"

export const userLoginCreate = (req, res, next) => {
    let { userName, email, password } = req.body; 
    User.findOne({ email })
    .then(user=>{
        if(user){
           return res.status(422).json({ errors: [{ user: "email already exists" }] });
        }else {
           const user = new User({
                userName: userName,
                email: email,
                password: password,
            });
            bcrypt.genSalt(10, function(err, salt) { 
               bcrypt.hash(password, salt, function(err, hash) {
                    if (err) throw err;
                        user.password = hash;
                        user.save()
                        .then(response => {
                            res.status(200).json({
                                success: true,
                                result: response
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                errors: [{ err: 'oops' }]
                            });
                        });
                });
            });
        }
    }).catch(err =>{
        res.status(500).json({
            errors: [{ error: 'Something went wrong' }]
        });
    })
  }  

export const userLogin = (req, res) => {
    let { email, password } = req.body;
    
    User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ errors: [{ password: "incorrect" }] });
                }
                let access_token = createJWT(
                    user.email,
                    user._id,
                    3600
                );
                jwt.verify(access_token, TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        res.status(500).json({ err: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            })
            .catch(err => {
                res.status(500).json({ err: "oops" });
            });
        }
    })
    .catch(err => {
        res.status(500).json({ err: err });
    });
}


function createJWT(email, userId, duration) {
    const payload = {
       email,
       userId,
       duration
    };
    return jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: duration,
    });
 }; 

 