const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageHistory')
})

module.exports = Router;