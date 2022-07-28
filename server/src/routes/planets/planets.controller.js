const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  const success = res.status(200);

  return success.json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
