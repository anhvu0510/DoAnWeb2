const Express = require('express');
const passport = require('../Middleware/passport');


const Route = Express.Router();

Route.get('/', (req, res) => {
  res.render('PageLogin');
}).post(
  '/',
  passport.authenticate('local.login', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    const quyen = req.user.userRoleId;

    if (quyen === 0) {
      res.redirect('/features');
    } else if (quyen === 1) {
      res.send('Trang Nhan Vien Ngan Hang');
    } else if (quyen === 2) {
      res.redirect('/about');
    } else {
      res.redirect('/500');
    }
  }
);

module.exports = Route;
