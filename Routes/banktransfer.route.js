const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageBankTransfer',{title : 'Bank Transfer'})
})

Router.use('/internaltransfer', require('./internaltransfer.route'));
Router.use('/transfermoneyhistory', require('./transfermoneyhistory.route'));
module.exports = Router;