const taskRouter = require("express").Router();
const { Task, Project, User } = require("../../models");
const { authMiddleware } = require("../../middleware/authMiddleware");

taskRouter.use(authMiddleware);
// CREATE task
taskRouter.post("/", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.body.project,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const loggedInUser = await User.findById(req.user._id);

    const task = await Task.create({
      ...req.body,
      user: req.user._id,
      family: loggedInUser.family,
    });

    res.status(201).json(task);
  } catch (error) {
      console.log(error);
  res.status(400).json({
    message: error.message,
    errors: error.errors,
  });
  }
});

// GET all tasks for logged-in user
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).populate("project", "title");

    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one task
taskRouter.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("project", "title");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE task
taskRouter.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
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

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE task
taskRouter.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = taskRouter;