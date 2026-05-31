//Import dependencies
const userRoutes = require("express").Router();

const { User} = require("../../models");
//POST request
userRoutes.post("/register", async (req,res) =>{
try{
    const {username, email, password, role} = req.body;
    const user = await User.create({
        username,
        email,
        password,
        role
    });
    const responseData = {
        username: user.username,
        email: user.email,
        id: user._id,

    }
    res.status(201).json({
        message: "User added successfully",
        user: responseData

    });
    } catch(error){
        res.status(400).json(error);
    }
});

module.exports = userRoutes;
