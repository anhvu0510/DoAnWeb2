const Express = require('express');
const passport = require('../Middleware/passport');
const Customer = require('../Services/customer')

const Route = Express.Router();

Route.get('/', async (req, res) => {
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
      else if (status === 2) {
        res.redirect('/waiting-page');
      } else if (status === 3) {
        res.redirect('/features');
      } else {
        res.redirect('/404');
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
