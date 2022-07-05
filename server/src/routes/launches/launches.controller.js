const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  const success = res.status(200);

  return success.json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  const { mission, rocket, target } = launch;

  const isDataInvalid = !mission || !rocket || !launch.launchDate || !target;

  if (isDataInvalid) {
    const responseFailure = res.status(400);

    return responseFailure.json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  const isLaunchDateInvalid = launch.launchDate.toString() === "Invalid Date";

  if (isLaunchDateInvalid) {
    const responseFailure = res.status(400);

    return responseFailure.json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);

  const responseSuccessful = res.status(201);

  return responseSuccessful.json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
