const Express = require('express')
const Router = Express.Router();
const {isStatusUpdate} = require('../Middleware/auth')


Router.use(isStatusUpdate);

Router.get('/', (req, res) => {
    res.render('PageInfo', { title: 'Update Information' })  
})


module.exports = Router;