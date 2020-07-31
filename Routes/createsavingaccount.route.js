const Express = require('express');
const Router = Express.Router();
const Moment = require('moment');
const Customer = require('../Services/customer');
const SavingAccount = require('../Services/saving_account');

Router.get('/', (req, res) => {
    res.render('PageCreateSavingAccount',{title : 'Create Saving Acoount'})
})

Router.post('/',async (req, res) => {
    const accountnumber = req.user.id + Math.floor(Math.random() * 999999);
    const { funds, currency, term } = req.body;
    var interestrate = 0;
    var closingdate = Moment();
    if(term==6){
        interestrate = 0.05;
        closingdate.add(6,'months');
    }
    else if(term==12){
        interestrate = 0.1;
        closingdate.add(12,'months');
    }
    else if(term==24){
        interestrate = 0.15;
        closingdate.add(24,'months');
    }

    const newSavingacoount = await SavingAccount.create({
        account_number: accountnumber,
        issue_date: new Date(),
        funds: funds,
        currency: currency,
        interest_rate: interestrate,
        term: term,
        closing_date: closingdate,
        userId: req.user.id,
    });
    res.render('PageCreateAccountSuccess',{title : 'Create Acoount Success'});
});

module.exports = Router;