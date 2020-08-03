const Express = require('express')
const Router = Express.Router()
const { isStaff } = require('../../Middleware/auth')

Router.use(isStaff)

Router.get('/', (req, res) => {
    res.render('admin/PageSaving',
        {
            title: 'Saving Managament',
            CustomerName: 'Staff',
            isActive: 4,
        })
})


module.exports = Router;



