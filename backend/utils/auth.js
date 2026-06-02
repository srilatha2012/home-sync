const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const expiration = "2h";
module.exports = {
    signToken : function ({username, email, _id, role}) {
        const payload = {
            username, 
            email,
             _id,
            role,
        };
        return jwt.sign(payload, JWT_SECRET, {expiresIn: expiration});
    }
}