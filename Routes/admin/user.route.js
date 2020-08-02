const Express = require('express')
const Router = Express.Router()
const { isStaff } = require('../../Middleware/auth')
const User = require('../../Services/user')
const Customer = require('../../Services/customer')

Router.use(isStaff)

Router.get('/', async (req, res) => {
    User.findAll({
        where: { RoleID: 0 },
        include: [{
            model: Customer,
            where: {},
            attributes: ['name'],
            //paranoid: false,
            required: false,
            //raw :true
        }],
        raw: true,
        nest: true
    }).then(data => {
        //console.log(data);
        //console.log(data.map(item => item.get({plain : true})));
        res.render('admin/PageUser',
            {
                title: 'User Managament',
                CustomerName: 'Staff',
                data
            })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = Router;



