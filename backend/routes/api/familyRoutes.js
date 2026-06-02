const familyRoutes = require("express").Router();
const { authMiddleware } = require("../../middleware/authMiddleware");
const Family = require("../../models/Family");
const User = require("../../models/User")

familyRoutes.post("/", authMiddleware, async (req, res) => {
    console.log("req.user", req.user);
    try {
        const family = await Family.create({
            name: req.body.name,
            owner: req.user._id,
            members: [
                {
                    user: req.user._id,
                    role: req.user.role,
                },
            ]
        });

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { family: family._id },
            { new: true }
        );
        console.log("UpdatedUser", updatedUser)
        res.status(201).json({
            message: "Family created successfully",
            family,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

familyRoutes.get("/my-family", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("family");

    if (!user || !user.family) {
      return res.status(404).json({ message: "No family found" });
    }

    res.status(200).json({
      message: "Family found",
      family: user.family,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = familyRoutes