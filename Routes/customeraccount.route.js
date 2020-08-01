const Express = require('express');
const Router = Express.Router();
const PaymentAccount = require('../Services/payment_account');
const SavingAccount = require('../Services/saving_account');

Router.get('/', async (req, res) => {
    const paymentaccounts = await PaymentAccount.findAll({
        where:{
            userId: req.user.id
        }
    });
    const savingaccounts = await SavingAccount.findAll({
        where:{
            userId: req.user.id
        }
    });
    res.render('PageCustomerAccount',{title : 'Customer Acoount', paymentaccounts: paymentaccounts, savingaccounts: savingaccounts});
})

module.exports = Router;