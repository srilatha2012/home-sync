const router = require("express").Router();

const userRoutes = require("./userRoutes");
const familyRoutes = require("./familyRoutes");
const projectRoutes = require("./projectRoutes");

router.use("/users", userRoutes);
router.use("/families", familyRoutes);
router.use("/projects", projectRoutes);

module.exports = router;