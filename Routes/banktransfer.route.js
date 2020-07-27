const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageBankTransfer')
})

module.exports = Router;