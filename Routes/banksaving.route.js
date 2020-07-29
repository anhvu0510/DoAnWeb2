const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageBankSaving',{title : 'Bank Saving'})
})

module.exports = Router;