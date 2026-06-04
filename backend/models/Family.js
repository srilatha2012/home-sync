//Import mongoose package
const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        role: {
            type: String,
            enum: ["parent", "spouse", "teen", "child"],
            required: true,
        }
    }],

},
    { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);
//Create User module with userSchema

module.exports = Family;