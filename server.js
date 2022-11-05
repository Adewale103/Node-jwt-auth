const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "test-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Desync  Db");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
// For Prod, if you do not want to drop database...
// const app = express();
// app.use(...);

// const db = require("./app/models");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ mesage: "This shows that it is working!" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}!`);
});
