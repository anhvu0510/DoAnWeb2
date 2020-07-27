const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageAccount')
})

module.exports = Router;