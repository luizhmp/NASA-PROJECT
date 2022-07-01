const { launches } = require("../../models/launches.model");

function getAllLaunches(req, res) {
  const success = res.status(200);

  const formattedLaunchesValues = Array.from(launches.values());

  return success.json(formattedLaunchesValues);
}

module.exports = {
  getAllLaunches,
};
