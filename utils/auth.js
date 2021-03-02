const jwt = require("jsonwebtoken");

const createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};


module.exports = createJWT

// function auth( res, req, next ){
//     const token = req.header( 'x-auth-token' );

//     //check for token
//     if( !token ){
//         res.status(401).json({ msg: 'No Token, Authorization Denied' })
//     };
//     try{
//         //verify
//         const decoded =jwt.verify( token, jwtSecret);
//         //add user
//         req.user = decoded;
//         next(); 
//     }catch(e){
//         res.status(400).json({ msg: 'Token is not valid'})
//     } 
// };

// module.exports = auth;