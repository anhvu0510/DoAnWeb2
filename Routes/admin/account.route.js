const Express = require("express");
const Router = Express.Router();
const User = require("../../Services/user");
const Payment = require("../../Services/payment_account");
const Savings = require("../../Services/saving_account");
const Customer = require("../../Services/customer");
const Transaction = require("../../Services/transaction");
const { Op } = require("sequelize");
const { isStaff } = require("../../Middleware/auth");

Router.use(isStaff);

Router.get("/", async (req, res) => {
  if (typeof req.query.search === "undefined") {
    const paymentAccounts = await Payment.findAll({
      where: {},
      include: [
        {
          model: User,
          attributes: ["StatusID"],
          where: {},
          include: [
            {
              model: Customer,
              where: {},
              attributes: ["name"],
            },
          ],
          raw: true,
          nest: true,
        },
      ],
      raw: true,
      nest: true,
    });

    const savingsAccounts = await Savings.findAll({
      where: {},
      include: [
        {
          model: User,
          where: {},
        },
      ],
    });
    res.render("admin/PageAccount", {
      title: "Account Managament",
      CustomerName: "Staff",
      isActive: 2,
      paymentAccounts,
      savingsAccounts,
    });
  } else {
    const paymentAccounts = await Payment.findAll({
      where: {
        [Op.or]: [
          { userId: { [Op.substring]: req.query.search.trim() } },
          { account_number: { [Op.substring]: req.query.search.trim() } },
        ],
      },
      include: [  
        {
          model: User,
          where: {},
          include: [
            {
              model: Customer,
              where : {},
              attributes: ["name"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
    const savingsAccounts = await Savings.findAll({
      where: {
        [Op.or]: [
          { userId: { [Op.substring]: req.query.search } },
          { account_number: { [Op.substring]: req.query.search } },
        ],
      },
      include: [
        {
          model: User,
          where: {},
        },
      ],
    });

    res.render("admin/PageAccount", {
      title: "Account Managament",
      CustomerName: "Staff",
      isActive: 2,
      paymentAccounts,
      savingsAccounts,
    });
  }
});
Router
  .get("/payment-account-details/:accountNumber", async (req, res) => {
  if (typeof req.params.accountNumber != "undefined") {
    const accountNumber = req.params.accountNumber;
    const account = await Payment.findOne({
      where: { account_number: req.params.accountNumber },
      include: [
        {
          model: User,
          where: {},
          include: [
            {
              model: Customer,
              where: {},
              attributes: ["name"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    let calFromDate, calToDate, transactions;
    let fromDate, toDate;

    if (
      typeof req.query.fromDate != "undefined" &&
      req.query.toDate != "undefined"
    ) {
      calFromDate = new Date(
        parseInt(req.query.fromDate.substring(0, 4)),
        parseInt(req.query.fromDate.substring(5, 7)) - 1,
        parseInt(req.query.fromDate.substring(7, 10)) + 1
      );
      calToDate = new Date(
        parseInt(req.query.toDate.substring(0, 4)),
        parseInt(req.query.toDate.substring(5, 7)) - 1,
        parseInt(req.query.toDate.substring(8, 10)) + 1
      );

      // compare if "to date" comes before "from date" then swap them
      //if (calFromDate.getTime() > calToDate.getTime) {
      if (calFromDate > calToDate) {
        [calFromDate, calToDate] = [calToDate, calFromDate];
        fromDate = req.query.toDate;
        toDate = req.query.fromDate;
      } else {
        fromDate = req.query.fromDate;
        toDate = req.query.toDate;
      }

      transactions = await Transaction.findAll({
        where: {
          [Op.or]: [
            { SourceID: accountNumber },
            { DestinationID: accountNumber }
          ],
          [Op.and]: [
            {
              date: { [Op.between]: [calFromDate, calToDate] }
            }
          ]
        }
      });
    }

    res.render("admin/PagePaymentAccountDetails", {
      title: "Account Managament",
      CustomerName: "Staff",
      isActive: 2,
      account,
      transactions,
      fromDate,
      toDate
    });
  }
}).post("/payment-account-details/:acocuntNumber", async (req, res) => {
  const {
    userId,
    accountNumber,
    dateOpened,
    balance,
    currency,
    transferLimit,
  } = req.body;

  const isSuccess = await Payment.update(
    {
      issue_date: dateOpened,
      balance: balance,
      currency: currency,
      transger_limit: transferLimit,
    },
    {
      where: { account_number: accountNumber },
    }
  );

  const account = await Payment.findOne({
    where: { account_number: accountNumber },
    include: [
      {
        model: User,
        where: {},
      },
    ],
  });
  if (isSuccess[0] === 1) {
    req.flash(
      "success_msg",
      userId + "'s payment account updated successfully"
    );
    res.redirect(
      "/admin/account/payment-account-details/" + account.account_number
    );
  } else {
    req.flash("error_msg", "Failed to updated" + userId + "'s payment account");
    res.redirect(
      "/admin/account/payment-account-details/" + account.account_number
    );
  }
});

Router.get("/savings-account-details/:accountNumber", async (req, res) => {
  if (typeof req.params.accountNumber != "undefined") {
    const account = await Savings.findOne({
      where: { account_number: req.params.accountNumber },
      include: [
        {
          model: User,
          where: {},
          include: [
            {
              model: Customer,
              where: {},
              attributes: ["name"]
            }
          ]
        }
      ],
      raw: true,
      nest: true
    });
    res.render("admin/PageSavingsAccountDetails", {
      title: "Savings Account Details",
      CustomerName: "Staff",
      isActive: 2,
      account
    });
  }
}).post("/savings-account-details/:acocuntNumber", async (req, res) => {
  const {
    userId,
    accountNumber,
    dateOpened,
    closingDate,
    funds,
    currency,
    term,
    interestRate
  } = req.body;

  var tempDate = new Date();
  var today = new Date(
    tempDate.getUTCFullYear(),
    tempDate.getUTCMonth(),
    tempDate.getUTCDate() + 1
  );
  var newDateOpened = new Date(
    parseInt(dateOpened.substring(0, 4)),
    parseInt(dateOpened.substring(5, 7)) - 1,
    parseInt(dateOpened.substring(8, 10)) + 1
  );
  var newClosingDate = new Date(
    parseInt(closingDate.substring(0, 4)),
    parseInt(closingDate.substring(5, 7)) - 1,
    parseInt(closingDate.substring(8, 10)) + 1
  );

  if (
    newDateOpened.getTime() > today.getTime() ||
    newDateOpened.getTime() > newClosingDate.getTime()
  ) {
    req.flash("error_msg", `Failed to update ${userId}'s savings account`);
    return res.redirect(
      `/admin/account/savings-account-details/${accountNumber}`
    );
  }

  Savings.update(
    {
      issue_date: dateOpened,
      closing_date: closingDate,
      funds: funds,
      currency: currency,
      term: term,
      interest_rate: interestRate
    },
    {
      where: { account_number: accountNumber }
    }
  )
    .then(result => {
      console.log(result);
      req.flash("success_msg", "Savings account updated successfully");
      res.redirect(`/admin/account/savings-account-details/${accountNumber}`);
    })
    .catch(err => {
      console.log(err);
      req.flash("error_msg", `Failed to update ${userId}'s savings account`);
      res.redirect(`/admin/account/savings-account-details/${accountNumber}`);
    });
});

module.exports = Router;
