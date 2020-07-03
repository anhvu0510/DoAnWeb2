const Passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Account = require("../Services/account");

//Login Local
Passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      Account.findByUsername(username)
        .then(async account => {
          if (
            !account ||
            !account.isActive ||
            !Account.confirmPassword(password, account.password)
          ) {
            console.log("something went wrong");
            console.log("");
            return done(null, false);
          }
          return done(null, account);
        })
        .catch(err => done(err));
    }
  )
);

//Passport Init:
Passport.serializeUser(function(account, done) {
  return done(null, account.id);
});

Passport.deserializeUser(function(id, done) {
  Account.findById(id)
    .then(account => {
      return done(null, account);
    })
    .catch(() => done(null, false));
});
module.exports = Passport;
