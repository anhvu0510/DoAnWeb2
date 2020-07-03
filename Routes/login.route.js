const Express = require("express");
const Passport = require("../Middleware/passport");
const Account = require("../Services/account");

const Route = Express.Router();

Route.route("/")
  .get((req, res) => {
    res.render("pLogin");
  })
  .post(
    Passport.authenticate("local.login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

module.exports = Route;
