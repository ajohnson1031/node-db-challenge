const express = require("express");
const projects = require("./project-model.js");
const validate = require("../middleware");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const p = await projects.find();
    if (p) {
      p.map(p => (p.completed = p.completed === 0 ? false : true));
      res.json(p);
    } else res.status(404).json({ message: "No projects found." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const p = await projects.findById(id);
    if (p) {
      p[0].completed = p[0].completed === 0 ? false : true;
      res.json(p);
    } else res.status(404).json({ message: "No projects found." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.get("/:id/tasks", async (req, res) => {
  const { id } = req.params;
  try {
    const t = await projects.findTasks(id);
    if (t) {
      t.map(t => (t.task_completed = t.task_completed === 0 ? false : true));
      res.json(t);
    } else res.status(404).json({ message: "No tasks found for that ID" });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.get("/all/resources", async (req, res) => {
  try {
    const r = await projects.findResources();
    r ? res.json(r) : res.status(404).json({ message: "No resources found." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.get("/:id/resources", async (req, res) => {
  const { id } = req.params;
  try {
    const r = await projects.findResourcesById(id);
    r
      ? res.json(r)
      : res.status(404).json({ message: "No resources found for that ID." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/", validate, async (req, res) => {
  try {
    const newProject = await projects.addProject(req.body);
    newProject
      ? res.status(201).json(newProject)
      : res.status(400).json({ message: "Could not create new project" });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/:id/tasks", validate, async (req, res) => {
  const { id } = req.params;
  req.body.project_id = id;
  try {
    const newTask = await projects.addTask(req.body);
    newTask
      ? res.status(201).json(newTask)
      : res.status(400).json({ message: "Could not create new task." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/resources", validate, async (req, res) => {
  try {
    const newResource = await projects.addResource(req.body);
    newResource
      ? res.status(201).json(newResource)
      : res.status(400).json({ message: "Could not create new resource." });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

module.exports = router;
