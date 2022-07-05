const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  const success = res.status(200);

  return success.json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  const { mission, rocket, destination } = launch;

  const isAnyDataMissing =
    !mission || !rocket || !launch.launchDate || !destination;

  if (isAnyDataMissing) {
    const responseFailure = res.status(400);

    return responseFailure.json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  const isLaunchDateValid = launch.launchDate.toString() === "Invalid Date";

  if (isLaunchDateValid) {
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
