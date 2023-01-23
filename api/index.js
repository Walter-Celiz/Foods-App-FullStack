require("dotenv").config();
const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { PORT } = process.env;
const { getAllDiets } = require("./src/controllers/dietController");

// Syncing all the models at once.
try {
  db.sync({ force: true }).then(() => {
    getAllDiets();
    console.log("Diets Charged 🟢🟢🟢🟢");
    server.listen(3001, () => {
      console.log(`#Server listening at Port:${PORT}!!! 🟢🟢🟢🟢`);
    });
  });
} catch (error) {
  return error;
  // console.log(error + "#Server not found!!! 🔴🔴🔴🔴");
}
