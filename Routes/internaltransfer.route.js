const Express = require('express');
const Router = Express.Router();
const uuid = require('uuid');
const { SendMailTransferMoney } = require('../Services/mail')
const Transaction = require('../Services/transaction');
const PaymentAccount = require('../Services/payment_account');
const User = require('../Services/user')

Router.get('/', async (req, res) => {
    const paymentaccounts = await PaymentAccount.findAll({
        where:{
            userId: req.user.id
        }
    });
    
    res.render('PageInternalTransfer',{title : 'Internal transfer', paymentaccounts: paymentaccounts});
})

Router.post('/',async (req, res) => {    
    const { sourceID, destinationID, amount, currency, description } = req.body;

    const destinationaccount = await PaymentAccount.findByPk(destinationID);    
    if(!destinationaccount){
        res.render('PageInternalTransferError',{title : 'Transfer money Error', error: "Destination account does not exist"});
    }
    else{
        const sourceaccount = await PaymentAccount.findByPk(sourceID);

        var sourceamount = 0;
        var destinationamount = 0;
        if(currency=="vnd"){
            if(sourceaccount.currency=="vnd"){
                sourceamount = Number(amount);
            } else{
                sourceamount = Number(amount) / 20000;
            }
            if(destinationaccount.currency=="vnd"){
                destinationamount = Number(amount);
            } else{
                destinationamount = Number(amount) / 20000;
            }
        }
        else if(currency=="usd"){
            if(sourceaccount.currency=="vnd"){
                sourceamount = Number(amount) * 20000;
            } else{
                sourceamount = Number(amount);
            }
            if(destinationaccount.currency=="vnd"){
                destinationamount = Number(amount) * 20000;
            } else{
                destinationamount = Number(amount);
            }
        }
        console.log(amount + currency, sourceamount + sourceaccount.currency, destinationamount + destinationaccount.currency);
        if(sourceaccount.balance < sourceamount){
            res.render('PageInternalTransferError',{title : 'Transfer money Error', error: "The amount in your account is not enough to transact"});
        }
        else if (sourceamount > sourceaccount.transger_limit){
            res.render('PageInternalTransferError',{title : 'Transfer money Error', error: "The amount you want to transfer exceeds the allowable limit"});
        }
        else{
            const newtransaction = await Transaction.create({
                transcation_id: uuid.v4(),
                amount: amount,
                currency: currency,
                description: description,
                date: new Date(),
                SourceID: sourceID,
                DestinationID: destinationID
            });
            const updatesourceaccount = await PaymentAccount.update({
                balance: sourceaccount.balance - sourceamount
            },{
                where:{
                    account_number: sourceID
                }
            })
            const updatedestinationaccount = await PaymentAccount.update({
                balance: destinationaccount.balance + destinationamount
            },{
                where:{
                    account_number: destinationID
                }
            })
            const user = await User.findOne({
                where:{
                    id: req.user.id
                }
            });
            const newbanlance = sourceaccount.balance - sourceamount;
            await SendMailTransferMoney(user.email,"TransferMoney Success",newbanlance + sourceaccount.currency);
            res.render('PageInternalTransferSuccess',{title : 'Transfer money Success'});
        }        
    }    
});

module.exports = Router;