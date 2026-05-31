//Import mongoose package
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

//Create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    role: {
        type: String,
        enum: ["parent", "spouse", "teen", "child"],
        default: "parent"
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family"
    },
},
    { timestamps: true }

);


//Hash password before saving a new user or when password is changed
userSchema.pre("save", async function () {
    if (this.isNew || this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

//Compare Login password with the hashed password stored in MongoDB
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password); //Here don't need await, because it already returns a Promise
};

//Create User model with userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;