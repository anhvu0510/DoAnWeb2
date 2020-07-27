const Passport = require("passport");
const localStrategy  = require("passport-local").Strategy;
const NguoiDung = require("../Services/nguoidung");
const asyncHandler = require('express-async-handler')


//Passport Init:
Passport.serializeUser(function (nguoiDung, done) {
  return done(null, nguoiDung.ma_nguoi_dung);
});

Passport.deserializeUser((ma_nguoi_dung, done)=> {
   NguoiDung.findById(ma_nguoi_dung)
    .then((nguoiDung) => {
      return done(null, nguoiDung);
    })
    .catch((err) => console.log(err + ''));
});
  


//Login Local
Passport.use(
  "local.login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async(ten_nguoi_dung, mat_khau, done) => {
      await NguoiDung.findByUsername(ten_nguoi_dung)
        .then(nguoiDung => {
          if (!nguoiDung)
            return done(null, false, { message: 'Account does not exist' })
          if (!NguoiDung.confirmPassword(mat_khau, nguoiDung.mat_khau))
            return done(null, false, { message: "Incorrect password, please check again" })
          if (nguoiDung.trang_thai === 0) 
            return done(null, false, { message: "Please activate your account by email" })
          return done(null, nguoiDung)
         })
        .catch(err => {
          console.log(err + '');
          return done(err)
        });
    })
);

module.exports = Passport;