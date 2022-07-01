const { planets } = require("../../models/planets.model");

function getAllPlanets(req, res) {
  const success = res.status(200);

  return success.json(planets);
}

module.exports = {
  getAllPlanets,
};
