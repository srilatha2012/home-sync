//Import denpendencies
const publicRouter = require("express").Router();
const {Family, Project, Task} = require("../../models");

//get stats for landing page
publicRouter.get("/stats", async (req, res) =>{
      try {
        const totalFamilies = await Family.countDocuments();
        const totalProjects = await Project.countDocuments();
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({status:"done"});

        res.json({
             totalFamilies,
             totalProjects,
             totalTasks,
             completedTasks
        });
      } catch(error) {
        res.status(500).json({message: "Failed to fetch stats"});
      } 
} );

module.exports = publicRouter


