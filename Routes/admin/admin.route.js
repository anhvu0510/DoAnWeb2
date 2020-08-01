const Express = require('express')
const Router = Express.Router()




const {isStaff} = require('../../Middleware/auth')

Router.use(isStaff)

Router.get('/', (req, res) => {
    res.render('admin/PageIndex', { title: 'Home - Dashbroad',CustomerName : 'Staff'})
})
Router.use('/user',require('./user.route'))
Router.use('/customer', require('./customer.route'))
Router.use('/saving', require('./saving.route'))
Router.use('/account', require('./account.route'))

module.exports = Router;



