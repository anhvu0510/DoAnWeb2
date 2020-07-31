const Express = require("express");
const Router = Express.Router();
const User = require("../Services/user");

const { authentication } = require("../Middleware/auth");

Router.use(authentication);

Router.get("/", (req, res) => {
  res.render("PageCustomer", { title: "Customer Services" });
});

// update user's information
Router.get("/information", (req, res) => {
  res.render("PageCustomerInformation", { title: "Customer Information" });
});

// change user's password
Router.get("/change-password", (req, res) => {
  res.render("PageCustomerChangePassword", {
    title: "Customer Change Password"
  });
}).post("/change-password", (req, res) => {
  const curPassword = req.body.curPassword;
  const user = req.user;
  if (!User.confirmPassword(curPassword, user.password)) {
    res.render("PageCustomerChangePassword", {
      title: "Change Password",
      error: "Current password isn't valid"
    });
  } else if (req.body.newPassword != req.body.confirmNewPassword) {
    res.render("PageCustomerChangePassword", {
      title: "Change Password",
      error: "Password confirmation doesn't match the password"
    });
  } else {
    User.updatePassword(req.user.id, req.body.newPassword);
    res.render("PageCustomerChangePassword", {
      title: "Change Password",
      success_msg: "Password changed successfully"
    });
  }
});

module.exports = Router;
