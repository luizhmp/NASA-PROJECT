const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  const success = res.status(200);

  return success.json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
