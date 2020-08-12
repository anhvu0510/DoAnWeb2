const Express = require('express');
const Router = Express.Router();
const Moment = require('moment');
const uuid = require('uuid');
const Customer = require('../Services/customer');
const SavingAccount = require('../Services/saving_account');
const PaymentAccount = require('../Services/payment_account');
const Transaction = require('../Services/transaction');
const { SendMailTransferMoney } = require('../Services/mail')


Router.get('/', async (req, res) => {
    const paymentaccounts = await PaymentAccount.findAll({
        where: {
            userId: req.user.id
        }
    });

    res.render('PageCreateSavingAccount', { title: 'Create Saving Acoount', paymentaccounts: paymentaccounts })
})

Router.post('/', async (req, res) => {
    try {
        const { paymentaccount, funds, currency, term } = req.body;
        const Payment = await PaymentAccount.findByPk(paymentaccount, { raw: true });
        //Tien hien tai trong tai khoan thanh toan
        const CurrentMoney = Payment.balance
        //Tien se bi mat di trong tai khoan thanh toan
        const Send = Payment.currency.toUpperCase() === currency.toUpperCase() ?
            funds : Payment.currency.toUpperCase() === 'VND' ?
                (funds * 20000) : (funds / 20000)
        //Tien se duoc cong vao tai khoanr tiet kiem
        const Recive = Payment.currency.toUpperCase() === currency.toUpperCase() ?
            Send : currency.toUpperCase() === 'VND' ?
                (Send * 20000) : (Send / 20000)

        const customer = await Customer.findOne({
            where: {
                userId: req.user.id
            },
            attributes: ['identifyID']
        });

      
        const rate = Number(term) === 6 ? 0.05 : Number(term) === 12 ? 0.1 : 0.15 ;
        const closeDate = Moment().add(term,'months')
       
        console.log(CurrentMoney);
        console.log(Send);
        console.log(Recive);
        if (CurrentMoney < Send) {
            req.flash('error_msg', 'Your Payment Account Not Enough Money')
            res.redirect('/features/account/createsavingaccount');
        } else {
            const accountnumber = customer.identifyID + Math.floor(Math.random() * 999999);
            const savingAccount = await SavingAccount.create({
                account_number: accountnumber,
                issue_date: new Date(),
                funds: Recive,
                currency: currency,
                interest_rate: rate,
                term: term,
                closing_date: closeDate,
                userId: req.user.id,
            });
            savingAccount
                .save()
                .then(async (account) => {
                    const newTransaction = await Transaction.create({
                        transcation_id: uuid.v4(),
                        amount: Send,
                        currency: Payment.currency,
                        description: "Send Saving",
                        date: new Date(),
                        SourceID: paymentaccount,
                        DestinationID: account.account_number
                    });
                    const Update = await PaymentAccount.update({ balance: (Payment.balance - Send) }, { where: { account_number: paymentaccount } })
                    await SendMailTransferMoney(req.user.email, "TransferMoney",
                        `${Send} ${Payment.currency}`);

                    req.flash('success_msg', `Create Saving Account Success - Account Number : ${account.account_number} `)
                    res.redirect('/features/account/createsavingaccount');
                })
                .catch((err) => {
                    console.log('Cannot Create Saving Account');
                    console.log(err);
                    req.flash('error_msg', 'Create Saving Account Fail')
                    res.redirect('/features/account/createsavingaccount');
                })

        }
       
    } catch (error) {
        console.log(error);
    }

    // const paymentaccounts = await PaymentAccount.findAll({
    //     where:{
    //         userId: req.user.id
    //     }
    // });
    // if(paymentaccounts.length==0){
    //     res.render('PageCreateSavingAccountError',{title : 'Create Acoount Failed', error: "You must have Payment Account before!!!"});
    // }
    // else{
    //     const { paymentaccount, funds , currency, term } = req.body;
    //     const Payment = await PaymentAccount.findByPk(paymentaccount,{raw : true});
    //    
    //var fundspayment = 0;
    // if(payment.currency=="vnd"){
    //     if(currency=="vnd"){
    //         fundspayment = funds;
    //     }
    //     else{
    //         fundspayment = funds * 20000;
    //     }
    // }
    // else{
    //     if(currency=="usd"){
    //         fundspayment = funds;
    //     }
    //     else{
    //         fundspayment = funds / 20000;
    //     }
    // }
    // if(payment.balance < fundspayment){
    //     res.render('PageCreateSavingAccountError',{title : 'Create Acoount Failed', error: "The balance in your payment account is not enough!!!"});
    // }
    // else{
    //     const customer = await Customer.findOne({
    //         where:{
    //             userId: req.user.id
    //         },
    //         attributes: ['identifyID']
    //     });
    //     const accountnumber = customer.identifyID + Math.floor(Math.random() * 999999);        
    //     var interestrate = 0;
    //     var closingdate = Moment();
    //     if(term==6){
    //         interestrate = 0.05;
    //         closingdate.add(6,'months');
    //     }
    //     else if(term==12){
    //         interestrate = 0.1;
    //         closingdate.add(12,'months');
    //     }
    //     else if(term==24){
    //         interestrate = 0.15;
    //         closingdate.add(24,'months');
    //     }

    //     const newSavingacoount = await SavingAccount.create({
    //         account_number: accountnumber,
    //         //payment_account: paymentaccount,
    //         issue_date: new Date(),
    //         funds: funds,
    //         currency: currency,
    //         interest_rate: interestrate,
    //         term: term,
    //         closing_date: closingdate,
    //         userId: req.user.id,
    //     });
    //     const newtransaction = await Transaction.create({
    //         transcation_id: uuid.v4(),
    //         amount: funds,
    //         currency: currency,
    //         description: "Send Saving",
    //         date: new Date(),
    //         SourceID: paymentaccount,
    //         DestinationID: accountnumber
    //     });
    //     const updatepaymentaccount = await PaymentAccount.update({
    //         balance: payment.balance - fundspayment
    //     },{
    //         where:{
    //             account_number: paymentaccount
    //         }
    //     })
    //     res.render('PageCreateAccountSuccess',{title : 'Create Acoount Success', accountnumber: accountnumber});
    // }        
    //}    
});

module.exports = Router;