const db = require("../data");

const find = async () => {
  return await db("project");
};

const findById = async id => {
  return await db("project").where({ id });
};

const findTasks = async id => {
  return await db
    .select(
      "t.id",
      "t.description as task_description",
      "t.notes as task_notes",
      "t.completed as task_completed",
      "project.name as project_name",
      "project.description as project_description"
    )
    .from("task as t")
    .join("project", "project.id", "t.project_id")
    .where({ project_id: id });
};

const findResources = async () => {
  return await db("resource");
};

const findResourcesById = async id => {
  return await db
    .select("r.id", "r.name", "r.description")
    .from("resource as r")
    .join("project_resource as pr", "pr.resource_id", "r.id")
    .where({ project_id: id });
};

const addProject = async p => {
  return await db("project")
    .insert(p)
    .then(p => findById(p[0]));
};

const addTask = async t => {
  return await db("task").insert(t);
};

const addResource = async r => {
  return await db("resource").insert(r);
};

module.exports = {
  find,
  findById,
  findTasks,
  findResources,
  findResourcesById,
  addProject,
  addTask,
  addResource
};
