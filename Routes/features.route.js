const Express = require('express')
const Router = Express.Router();
const Customer = require('../Services/customer')
const {authentication} = require('../Middleware/auth');



Router.use(authentication)

Router.get('/', async(req, res) => {
    res.render('PageFeatures',{title : "Features"})
})

Router.get('/test', (req, res) => {
    res.render('PageWaiting.ejs',{title : 'Test'})   
})

Router.use('/history',require('./history.route'))
Router.use('/bank-transfer',require('./banktransfer.route'))
Router.use('/bank-saving',require('./banksaving.route'))
Router.use('/customer',require('./customer.route'))
Router.use('/account',require('./account.route'))


module.exports = Router