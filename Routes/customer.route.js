const Express = require("express");
const Router = Express.Router();
const User = require("../Services/user");
const Customer = require("../Services/customer");

const { authentication } = require("../Middleware/auth");

Router.use(authentication);

Router.get("/", (req, res) => {
  res.render("PageCustomer", { title: "Customer Services" });
});

// update user's information
Router.get("/information", async (req, res) => {
  const curCustomer = await Customer.findByUserId(req.user.id);
  res.render("PageCustomerInformation", {
    title: "Customer Information",
    name: curCustomer.name,
    DOB: curCustomer.dob,
    phone: curCustomer.phone,
    address: curCustomer.address,
    gender: curCustomer.gender,
    identify: curCustomer.identify,
    identifyID: curCustomer.identifyID,
    identifyDate: curCustomer.identifyDate
  });
}).post("/information", async (req, res) => {
  const curCustomer = await Customer.findByUserId(req.user.id);

  //const { Name, DOB, Gender, Phone, Address, Identify, IdentifyID, IdentifyDate } = req.body;
  const Name = req.body.name;
  const DOB = req.body.DOB;
  const Gender = req.body.gender;
  const Phone = req.body.phone;
  const Address = req.body.address;
  const Identify = req.body.identify;
  const IdentifyID = req.body.identifyID;
  const IdentifyDate = req.body.identifyDate;

  const isSuccess = await Customer.updateInformation(
    curCustomer.id,
    Name,
    DOB,
    Gender,
    Phone,
    Address
  );

  if (isSuccess[0] === 1) {
    res.render("PageCustomerInformation", {
      title: "Customer Information",
      name: Name,
      DOB: DOB,
      phone: Phone,
      address: Address,
      gender: Gender,
      identify: Identify,
      identifyID: IdentifyID,
      identifyDate: IdentifyDate,
      success_msg: "Information updated successfully"
    });
  } else {
    res.render("PageCustomerInformation", {
      title: "Customer Information",
      name: curCustomer.name,
      DOB: curCustomer.dob,
      phone: curCustomer.phone,
      address: curCustomer.address,
      gender: curCustomer.gender,
      identify: curCustomer.identify,
      identifyID: curCustomer.identifyID,
      identifyDate: curCustomer.identifyDate,
      error_msg: "Failed to update information, please try again"
    });
  }
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
