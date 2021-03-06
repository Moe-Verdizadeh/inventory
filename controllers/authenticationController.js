import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';   

export const userLoginCreate = async (req, res) => {
    console.log(req.body);
    try {
        let { email, password, userName } = req.body;

        if (!email || !password || !userName){
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (password.length < 2){
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ msg: "An account with this email already exists." });
        }

        const salt = await bcrypt.genSalt();    
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            userName: userName,
            email: email ,
            password: passwordHash,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign(
            {
              user: savedUser._id,
            },
            process.env.JWT_SECRET
        ); 
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send();
    } catch (err){
        res.status(500).json({ error: err.message });
    }
};

export const userLogin = async (req, res) => {   
    try {
        const { email, password } = req.body;
        // validate
        if (!email || !password){
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials." });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }); 
        // res.json({
        //     token,
        //     user: {
        //         id: user._id,
        //         userName: user.userName,
        //         email: user.email,
        //     },
        // });
        req.session.testMe = 'testing';
        console.log('hello');
        console.log(token);
        res.cookie('hello', 'hello', { httpOnly: true });
        res.cookie('token', token, { httpOnly: true }).status(201).send({ success: "Logged in" });
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none", 
        // }).status(200).send({token: token, user: { id: user._id, userName: user.userName, email: user.email }});
    } catch(err) {
        res.status(500).json({ error: "err.message" });
    }
};

export const userLogOut = ( req, res ) => {
    //res.clearCookie("token").status(200).send();
    let authed = req.isAuthenticated();
    console.log('This is the auth state: ', authed);
    //console.log(req.isAuthenticated());
    if(authed) {
        res.status(200).send();
    } else {
        res.status(401).send();
    }
};

export const checkAuthentication = (req, res) => {
    let authed = req.isAuthenticated();
    console.log('This is the auth state: ', authed);
    if(authed) {
        console.log('authed');
        res.status(200).send();
    } else {
        res.status(401).send();
    }
}
 