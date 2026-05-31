const jsonwebtoken = require("jsonwebtoken");
const JSON_SECRET = process.env.JSON_SECRET;

async function token(payload) {
    jsonwebtoken.sign()
}