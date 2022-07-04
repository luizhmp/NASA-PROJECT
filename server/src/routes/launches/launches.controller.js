const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  const success = res.status(200);

  return success.json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  addNewLaunch(launch);

  const response = res.status(201);

  return response.json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
