const Express = require('express');
const Router = Express.Router();
const SavingAccount = require('../Services/saving_account')
const PaymentAcount = require('../Services/payment_account');
const uuid = require('uuid');
const { SendMailTransferMoney } = require('../Services/mail')
const Transaction = require('../Services/transaction');

Router
    .get('/', async (req, res) => {
    const savingaccounts = await SavingAccount.findAll({
        where: {
            userId: req.user.id
        }
    });
    const Payments = await PaymentAcount.findAll({
        where: {
            userId : req.user.id
        },
        attributes: ['account_number']
    })
    res.render('PageBankSaving',
        {
            title: 'Bank Saving',
            savingaccounts,
            Payments
        })
    })
    .post('/', async (req, res) => {
        try {
            const SendNumber = req.body.frmNumberAccount.trim();
            const ReciveNumber = req.body.AccountNumber.trim();
            const Currency = req.body.frmCur
            
            const Send = await SavingAccount.findByPk(SendNumber, { raw: true });
            const Recive = await PaymentAcount.findByPk(ReciveNumber, { attributes: ['currency','balance'], raw: true })
            const newMoney = new Date().getTime() >= new Date(Send.closing_date).getTime() ?
                Send.funds + (Send.funds * Send.interest_rate) : Send.funds
            const Money = Recive.balance + (Recive.currency.toUpperCase() === Currency ?
                newMoney : Currency === 'VND' ? (newMoney / 20000) : (newMoney * 20000))

            PaymentAcount
                .update({ balance: Money }, { where: { account_number : ReciveNumber } })
                .then(async (rs) => {
                    const newtransaction = await Transaction.create({
                        transcation_id: uuid.v4(),
                        amount: newMoney,
                        currency: Recive.currency,
                        description: 'Withdraw Saving Money',
                        date: new Date(),
                        SourceID: SendNumber,
                        DestinationID: ReciveNumber
                    });
                    newtransaction
                        .save()
                        .then(async (item) => {
                            await SavingAccount.destroy({ where: { account_number :  SendNumber } })
                            await SendMailTransferMoney(req.user.email, "TransferMoney",
                                `${newMoney.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${Recive.currency}`);
                            req.flash('success_msg', 'TransferMoney Success')
                            res.redirect('/features/bank-saving')
                        })
                        .catch((err) => {
                            console.log('Save Transaction Fail');
                        })
                })
                .catch((err) => {
                    console.log('Send Fail');
                    console.log(err);
                    req.flash('error_msg', 'TransferMoney Fail')
                    res.redirect('/features/bank-saving')
                })
        } catch (error) {
            console.log(error);
            req.flash('error_msg', 'Something Wrong, Please Try Again')
            res.redirect('/features/bank-saving')
        }

        
    })

module.exports = Router;