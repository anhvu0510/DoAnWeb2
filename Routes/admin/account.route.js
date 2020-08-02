const Express = require("express");
const Router = Express.Router();
const User = require("../../Services/user");
const Payment = require("../../Services/payment_account");
const Savings = require("../../Services/saving_account");
const { Op } = require("sequelize");
const { isStaff } = require("../../Middleware/auth");

Router.use(isStaff);

Router.get("/", async (req, res) => {
  if (typeof req.query.search == "undefined") {
    const paymentAccounts = await Payment.findAll({
      where: {},
      include: [
        {
          model: User,
          where: {}
        }
      ]
    });
    const savingsAccounts = await Savings.findAll({
      where: {},
      include: [
        {
          model: User,
          where: {}
        }
      ]
    });

    res.render("admin/PageAccount", {
      title: "Account Managament",
      CustomerName: "Staff",
      paymentAccounts,
      savingsAccounts
    });
  } else {
    const paymentAccounts = await Payment.findAll({
      where: {
        [Op.or]: [
          { userId: { [Op.substring]: req.query.search } },
          { account_number: { [Op.substring]: req.query.search } }
        ]
      },
      include: [
        {
          model: User,
          where: {}
        }
      ]
    });
    const savingsAccounts = await Savings.findAll({
      where: {
        [Op.or]: [
          { userId: { [Op.substring]: req.query.search } },
          { account_number: { [Op.substring]: req.query.search } }
        ]
      },
      include: [
        {
          model: User,
          where: {}
        }
      ]
    });
    //console.log(paymentAccounts);
    //console.log(req.query.paymentAccountId);

    res.render("admin/PageAccount", {
      title: "Account Managament",
      CustomerName: "Staff",
      paymentAccounts,
      savingsAccounts
    });
  }
});

Router.get("/payment-account-details", async (req, res) => {
  res.render("admin/PageAccount", {
    title: "Account Managament",
    CustomerName: "Staff"
  });
});

Router.get("/payment-account-details/:accountNumber", async (req, res) => {
  if (typeof req.params.accountNumber != "undefined") {
    const account = await Payment.findOne({
      where: { account_number: req.params.accountNumber },
      include: [
        {
          model: User,
          where: {}
        }
      ]
    });
    console.log(account);

    res.render("admin/PagePaymentAccountDetails", {
      title: "Payment Account Details",
      CustomerName: "Staff",
      account
    });
  }
}).post("/payment-account-details/:acocuntNumber", async (req, res) => {
  const {
    userId,
    accountNumber,
    dateOpened,
    balance,
    currency,
    transferLimit
  } = req.body;

  const isSuccess = await Payment.update(
    {
      issue_date: dateOpened,
      balance: balance,
      currency: currency,
      transger_limit: transferLimit
    },
    {
      where: { account_number: accountNumber }
    }
  );

  const account = await Payment.findOne({
    where: { account_number: accountNumber },
    include: [
      {
        model: User,
        where: {}
      }
    ]
  });
  if (isSuccess[0] === 1) {
    req.flash("success_msg", "Customer's payment account updated successfully");
    res.redirect(
      "/admin/account/payment-account-details/" + account.account_number
    );
  } else {
    req.flash("error_msg", "Failed to updated customer's payment account");
    res.redirect(
      "/admin/account/payment-account-details/" + account.account_number
    );
  }
});

module.exports = Router;
