const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageCustomer')
})

module.exports = Router;