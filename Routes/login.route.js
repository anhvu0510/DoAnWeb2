const Express = require("express");
const Passport = require("../Middleware/passport");
const NguoiDung = require("../Services/nguoidung");

const Route = Express.Router();

Route.route("/")
  .get((req, res) => {
    res.render("PageLogin");
  })
  .post(Passport.authenticate("local.login", {
    failureRedirect: "/login",
    failureFlash: true
  }), (req, res) => {
    const quyen = req.user.dataValues.quyen_nguoi_dung
    if (quyen === 0) {
      res.send('Trang Nguoi Dung')
    }
    else if (quyen === 1) {
      res.send('Trang Nhan Vien Ngan Hang')
    }
    else if ((quyen === 2)){
      res.send('Trang Admin Quan Ly')
    }
    else {
      res.redirect('/')
    }

  });

module.exports = Route;
