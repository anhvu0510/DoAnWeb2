const Express = require("express");
const Router = Express.Router();
const { SendMailActive } = require('../Services/mail')
const User = require('../Services/user')
const { check, body , validationResult} = require('express-validator');
const uuid = require('uuid');
const asyncHanler = require('express-async-handler')

Router.get("/", (req, res) => {
  res.render("PageRegister",{title : 'Sign Up'});
}).post("/", [
  check('email')
    .not().isEmpty().withMessage('Plaese fill in field Email')
    .custom(async (email) => {
      const found = await User.findByEmail(email);
      if (found) {
        throw Error('Email Existed')
      }
    }),
  check('username')
    .not().isEmpty().withMessage('Please fill in field Username')
    .isAlphanumeric().withMessage('Username must be alpha numeric and no space')
    .trim()
    .custom(async (user) => {
      const found = await User.findByUsername(user)
      if (found) {
        throw Error('Username already exists, Please choose another name')
      }
    }),

  check('password')
    .isLength({min : 8}).withMessage('Password must be least 8 characters')
    .custom((value, { req }) => {
      if (value !== req.body.re_password) {
        throw new Error('Password do not match')
      }
      return true
    })

], asyncHanler(async (req, res) => {
    //validate
    const err = validationResult(req)
    console.log(err);

    const { email, username, password, re_password } = req.body;
    if (!err.isEmpty()) {
      const errors = err.errors;
      console.log(err);

      res.render('PageRegister', {
        title :'Sign Up',
        errors,
        username,
        email,
        password,
        re_password
      })
    }
    else {
      const newUser = await User.create({
        id : uuid.v4(),
        user_name : username,
        email : email,
        password: User.hashPassword(password),
        RoleID: parseInt(0),
        StatusID: parseInt(0),
      })

      newUser
        .save()
        .then(asyncHanler(async (user) => {
          await SendMailActive(email,"Active Your Account",user.id)
          req.flash('success_msg','Register successfully, Please Check your mail to activate your account ')
          res.redirect('./login')
        }))
        .catch(err => console.log(err));
    }
    //pass
}));

module.exports = Router;
