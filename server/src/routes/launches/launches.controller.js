const { getAllLaunches } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  const success = res.status(200);

  return success.json(getAllLaunches());
}

module.exports = {
  httpGetAllLaunches,
};
