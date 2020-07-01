const Express = require("express");
const Route = Express.Router();

Route.get("/", (req, res) => {
  res.render("pLogin");
}).post("/", (req, res) => {
  res.send("post method login");
});

module.exports = Route;
