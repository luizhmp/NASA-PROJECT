const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  const isHabitablePlanet =
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6;

  return isHabitablePlanet;
}

const parseOptions = {
  comment: "#",
  columns: true,
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(parse(parseOptions))
      .on("data", async (data) => {
        const isHabitable = isHabitablePlanet(data);

        if (isHabitable) {
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const habitablePlanetsQuantity = (await getAllPlanets()).length;

        console.log(`${habitablePlanetsQuantity} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
