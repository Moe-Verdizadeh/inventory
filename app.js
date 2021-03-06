import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// const JWT_SECRET = "my_secret";

//app config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = 'mongodb+srv://mokode:TeddyMo3@inventory-project.bcxkk.mongodb.net/inventoryDb?retryWrites=true&w=majority'

//middleware
app.use(cookieParser());
app.use(session({
	secret: (process.env.secret || 'mybigsecret'),
	cookie: {
		maxAge: 10800000
	},
	resave: true,
	saveUninitialized: true
}));

//Authentication helper
const isAuthenticated = (req) => {
    console.log('Cookies: ', req.cookies);
	const token = (req.cookies && req.cookies.token) ||
				  (req.body && req.body.token) ||
				  (req.query && req.query.token) ||
				  (req.headers && req.headers['x-access-token']);
    //console.log('token', token);
	if(req.session.userId) return true;
	if(!token) return false; 


    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded) return true;
    return false;
};

//Initialize auth helper
app.use((req, res, next) => {
	req.isAuthenticated = () => {
		if(!isAuthenticated(req)) return false;
		return true;
	}

	res.locals.isAuthenticated = isAuthenticated(req);
	next();
});

app.use(express.json());
app.use(cors());
 
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoint
import routes from './routes.js';
app.use('/api', routes);

//test
const root = path.join(path.resolve(), '/client/build');
app.use(express.static(root));
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile('index.html', { root });
  } else next();
});

//listener
app.listen(port, () => console.log(`Listing on port: ${port}`));