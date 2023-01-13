require("dotenv").config();
const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { PORT } = process.env;
// const { getAllDiets } = require("./src/controllers/dietController");

// Syncing all the models at once.
try {
  db.sync({ force: true }).then(() => {
    // getAllDiets();
    // console.log("Diets Charged 🟢🟢🟢🟢");
    server.listen(PORT, () => {
      console.log("#Server listening at", process.env.PORT);
    });
  });
} catch (error) {
  console.log(error + "#Server not found!!! 🔴🔴🔴🔴");
}
