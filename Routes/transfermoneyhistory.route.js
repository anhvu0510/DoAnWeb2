const Express = require('express');
const Router = Express.Router();
const { Op } = require("sequelize");
const Transaction = require('../Services/transaction');
const PaymentAccount = require('../Services/payment_account');

Router.get('/', async (req, res) => {
    const paymentaccounts = await PaymentAccount.findAll({
        where:{
            userId: req.user.id
        }
    });
   
    res.render('PageTransferMoneyHistory',
        {
            title: 'Transfer Money History',
            paymentaccounts: paymentaccounts,
            
        });
})
Router.post('/',async (req, res) => {
    const { account } = req.body;
    const paymentaccounts = await PaymentAccount.findAll({
        where: {
            userId: req.user.id
        }
    });

    const transactions = await Transaction.findAll({
        where: {
            [Op.or]: [
              { SourceID: account },
              { DestinationID: account }
            ]
          }
    });

    res.render('PageTransferMoneyHistory', {
        title: 'Transfer Money History',
        paymentaccounts: paymentaccounts,
        historyList: transactions,
        queryAccount : account
    });
});
module.exports = Router;