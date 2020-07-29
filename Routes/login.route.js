const Express = require('express');
const passport = require('../Middleware/passport');


const Route = Express.Router();

Route.get('/', (req, res) => {
  res.render('PageLogin',{title : 'Sign In'});
}).post(
  '/',
  passport.authenticate('local.login', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    const role = req.user.RoleID;
    const status = req.user.StatusID
    if (role === 0) {
      if (status === 1) {
        res.redirect('/update-information');
      }
      else {
        res.redirect('/features');
      }
    } else if (role === 1) {
      res.send('Trang Nhan Vien Ngan Hang');
    } else if (role === 2) {
      res.redirect('/about');
    } else {
      res.redirect('/500');
    }
  }
);

module.exports = Route;
