const router = require("express").Router();
const { Project, User } = require("../../models");
const { authMiddleware } = require("../../middleware/authMiddleware");

// Protect all project routes
router.use(authMiddleware);

// CREATE project
router.post("/", async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.user._id);

        if (!loggedInUser.family) {
            return res.status(400).json({
                message: "User does not belong to a family yet",
            });
        }

        const project = await Project.create({
            ...req.body,
            user: req.user._id,
            family: loggedInUser.family,
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json(error);
    }
});

// GET all projects for logged-in user
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find({
            user: req.user._id,
        });

        res.json(projects);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET one project owned by logged-in user
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE project owned by logged-in user
router.put("/:id", async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(400).json(error);
    }
});

// DELETE project owned by logged-in user
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;