const Passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Account = require('../Services/account');
const asyncHandler = require('express-async-handler');

//Passport Init:
Passport.serializeUser(function (account, done) {
  return done(null, account.account_id);
});

Passport.deserializeUser((account_id, done) => {
  Account.findById(account_id)
    .then((account) => {
      return done(null, account);
    })
    .catch((err) => console.log(err + ''));
});

//Login Local
Passport.use(
  'local.login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (user_name, password, done) => {
      await Account.findByUsername(user_name)
        .then((account) => {
          if (!account)
            return done(null, false, { message: 'Account does not exist' });
          if (!Account.confirmPassword(password, account.password))
            return done(null, false, {
              message: 'Incorrect password, please check again',
            });
          if (account.status === 0)
            return done(null, false, {
              message: 'Please activate your account by email',
            });
          return done(null, account);
        })
        .catch((err) => {
          console.log(err + '');
          return done(err);
        });
    }
  )
);

module.exports = Passport;
