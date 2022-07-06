const {
  getAllLaunches,
  addNewLaunch,
  checkIfLaunchExists,
  abortLaunchById,
} = require("../../models/launches.model");

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

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const doesLaunchExists = checkIfLaunchExists(launchId);

  if (!doesLaunchExists) {
    const responseFailure = res.status(404).json({
      error: "Launch not found",
    });

    return responseFailure;
  }

  const abortedLaunch = abortLaunchById(launchId);

  const responseSuccess = res.status(200).json(abortedLaunch);

  return responseSuccess;
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
