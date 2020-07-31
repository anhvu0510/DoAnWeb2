const Express = require('express')
const Router = Express.Router()
const { isStaff } = require('../../Middleware/auth')

Router.use(isStaff)

Router.get('/', (req, res) => {
    res.render('admin/PageAccount', { title: 'Account Managament', CustomerName: 'Staff' })
})


module.exports = Router;



