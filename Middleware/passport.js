const Passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const NguoiDung = require("../Services/nguoidung");

//Login Local
Passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (ten_nguoi_dung, mat_khau, done) => {
      NguoiDung.findByUsername(ten_nguoi_dung)
        .then(async nguoiDung => {
          if (
            !nguoiDung ||
            !nguoiDung.trang_thai ||
            !NguoiDung.confirmPassword(mat_khau, nguoiDung.mat_khau)
          ) {
            console.log("something went wrong");
            console.log("");
            return done(null, false);
          }
          return done(null, nguoiDung);
        })
        .catch(err => done(err));
    }
  )
);

//Passport Init:
Passport.serializeUser(function(nguoiDung, done) {
  return done(null, nguoiDung.ma_nguoi_dung);
});

Passport.deserializeUser(function(ma_nguoi_dung, done) {
  NguoiDung.findById(ma_nguoi_dung)
    .then(nguoiDung => {
      return done(null, nguoiDung);
    })
    .catch(() => done(null, false));
});
module.exports = Passport;
