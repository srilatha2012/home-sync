const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const expiration = "2h";
module.exports = {
    signToken : function ({username, email, _id}) {
        const payload = {username, email, _id};
        console.log("json111 secret", JWT_SECRET);
         return jwt.sign(payload, JWT_SECRET, {expiresIn: expiration});
    }
}