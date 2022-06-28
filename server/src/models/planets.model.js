const parse = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  const isHabitablePlanet =
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6;

  return isHabitablePlanet;
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    const isHabitable = isHabitablePlanet(data);

    if (isHabitable) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      habitablePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    const habitablePlanetsQuantity = habitablePlanets.length;

    console.log(`${habitablePlanetsQuantity} habitable planets found!`);
  });

module.exports = {
  planets: habitablePlanets,
};
