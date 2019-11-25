const validate = (req, res, next) => {
  const body = req.body;
  const type = body.type;

  switch (type) {
    case "p":
      !body.name || !body.description
        ? res.status(400).json({
            message: "Please enter a name and description for this project."
          })
        : next();
      break;
    case "t":
      !body.project_id || !body.description
        ? res.status(400).json({
            message: "Please enter a project ID and description for this task."
          })
        : next();
      break;
    case "r":
      !body.name || !body.description
        ? res.status(400).json({
            message: "Please enter a name and description for this resource."
          })
        : next();
      break;
    default:
      next();
  }
};

module.exports = validate;
