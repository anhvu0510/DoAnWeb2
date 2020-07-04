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
          if (!nguoiDung)
            return done(null, false, { message: 'Account does not exist' })
          if (!NguoiDung.confirmPassword(mat_khau, nguoiDung.mat_khau))
            return done(null, false, { message: "Incorrect password, please check again" })
          if (nguoiDung.trang_thai === 0)
            return done(null, false, { message: "Please activate your account by email" })
          return done(null, nguoiDung)
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
