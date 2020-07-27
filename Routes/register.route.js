const Express = require("express");
const Router = Express.Router();
const User = require('../Services/account')
const { check, body , validationResult} = require('express-validator');
const uuid = require('uuid');




Router.get("/", (req, res) => {
  res.render("PageRegister");
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

], async (req, res) => {
    //validate
    const err = validationResult(req)
    console.log(err);

    const { email, username, password, re_password } = req.body;
    if (!err.isEmpty()) {
      const errors = err.errors;
      console.log(err);

      res.render('PageRegister', {
        errors,
        username,
        email,
        password,
        re_password
      })
    }
    else {
      const id = uuid.v1()
      console.log(typeof id);

      const newUser = await User.create({
        account_id : uuid.v4(),
        user_name : username,
        email : email,
        password : User.hashPassword(password),
        status : 0,
        permission : 0
      })

      newUser
        .save()
        .then(user => {
          req.flash('success_msg','Register successfully, you can login now')
          res.redirect('./login')
        })
        .catch(err => console.log(err));
    }
    //pass
});

module.exports = Router;
