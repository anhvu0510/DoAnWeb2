const Express = require('express')
const Router = Express.Router()
const { isStaff } = require('../../Middleware/auth')

Router.use(isStaff)

Router.get('/', (req, res) => {
    res.render('admin/PageUser', { title: 'User Managament', CustomerName: 'Staff' })
})

module.exports = Router;



