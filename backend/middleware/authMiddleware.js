//Import dependency
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

//authentication middleware to verify the token and extract the payload
async function authMiddleware(req, res, next) {
   try {
       let token = req.headers.authorization;
       
       //Check if there is a token
       if(!token) {
          return res.status(403).json({message: "No token provided"});
       }
       //remove 'Bearer' part of the token
       token = token.split(' ').pop().trim();

        //verify the token and extract the payload
       const decoded = jwt.verify(token,secret);

       //pass the paylod from the token to the request
       req.user = decoded;
       
       //move on to the route (or next middleware)
       next();
      
   }catch(error) {
      console.log(error.message);
      res.status(400).json({message : error.message});
   }
}
module.exports = {authMiddleware}