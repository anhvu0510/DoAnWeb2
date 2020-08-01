const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageAccount',{title : 'Account Managament'})
})
Router.use('/createpaymentaccount', require('./createpaymentaccount.route'));
Router.use('/createsavingaccount', require('./createsavingaccount.route'));
Router.use('/customeraccount',require('./customeraccount.route'));

module.exports = Router;