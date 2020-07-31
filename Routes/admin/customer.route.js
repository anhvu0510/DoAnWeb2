const Express = require('express')
const Router = Express.Router()
const { isStaff } = require('../../Middleware/auth')

Router.use(isStaff)

Router.get('/', (req, res) => {
    res.render('admin/PageCustomer', { title: 'Customer Managament', CustomerName: 'Staff' })
})

module.exports = Router;



