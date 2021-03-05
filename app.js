import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';

export const jwtSecret = "my_secret";

//app config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = 'mongodb+srv://mokode:TeddyMo3@inventory-project.bcxkk.mongodb.net/inventoryDb?retryWrites=true&w=majority'

//middleware
app.use(express.json());
app.use(cors());
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
	const token = (req.cookies && req.cookies.token) ||
				  (req.body && req.body.token) ||
				  (req.query && req.query.token) ||
				  (req.headers && req.headers['x-access-token']);
	if(req.session.userId) return true;
	if(!token) return false;

	jwt.verify(token, 'imasecretshh', function(err, decoded){
		console.log(err);
		if(err) return false;
		return true;
	});
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
 
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoint
import routes from './routes.js';
app.use('/', routes);

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