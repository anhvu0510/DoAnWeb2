const Express = require('express');
const Router = Express.Router();

Router.get('/', (req, res) => {
    res.render('PageAccount',{title : 'Account Managament'})
})



module.exports = Router;