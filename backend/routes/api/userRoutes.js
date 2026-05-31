//Import dependencies
const userRoutes = require("express").Router();

const { User } = require("../../models");
const { signToken } = require("../../utils/auth");

//POST request  - User Registration
userRoutes.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
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
    } catch (error) {
        res.status(400).json(error);
    }
});

//POST request -User Login
userRoutes.post("/login", async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const user = await User.findOne({ username: username, email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isCorrectPassword = await user.isCorrectPassword(password);
        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Invalid email or Password" });
        }
        const token = signToken(user);
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Login Failed", error: error.message });
    }
});


module.exports = userRoutes;
