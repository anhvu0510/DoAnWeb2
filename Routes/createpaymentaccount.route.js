const Express = require('express');
const Router = Express.Router();
const RNG_ID = require('uuid')
const Customer = require('../Services/customer');
const PaymentAccount = require('../Services/payment_account');

Router.get('/', (req, res) => {
    res.render('PageCreatePaymentAccount',{title : 'Create Payment Acoount'})
})

Router.post('/',async (req, res) => {
    const customer = await Customer.findOne({
        where:{
            userId: req.user.id
        },
        attributes: ['identifyID']
    });
    const accountnumber = customer.identifyID + Math.floor(Math.random() * 999999);
    const { balance, currency } = req.body;
    const newPaymentacoount = await PaymentAccount.create({
        account_number: accountnumber,
        issue_date: new Date(),
        balance: balance,
        currency: currency,
        transger_limit: 50,
        userId: req.user.id,
    });
    res.render('PageCreateAccountSuccess',{title : 'Create Acoount Success' ,accountnumber: accountnumber});
});

module.exports = Router;