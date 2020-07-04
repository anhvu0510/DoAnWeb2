const { Router } = require("express");
const Express = require("express");
const Route = Express.Router();

Route.get("/", (req, res) => {
  res.render("pRegister");
}).post("/", (req, res) => {
  res.send("Post method register");
});

module.exports = Route;
