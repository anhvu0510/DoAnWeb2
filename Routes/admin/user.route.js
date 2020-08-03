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
                isActive : 1,
                data
            })
    }).catch(err => {
        console.log(err)
    })
})
Router.get('/lock/:id', (req, res) => {
    const { id } = req.params;
    User
        .update({ StatusID: 4 }, { where: { id } })
        .then((results) => {
            console.log(results);
            req.flash('success_msg', `Lock Success UserID : ${id}` );
            res.redirect('/admin/user')
        }).catch((err) => {
            console.log(err);
            req.flash('error_msg', `Lock Fail UserID : ${id}`);
            res.redirect('/admin/user')
        })

})
Router.get('/unlock/:id/:old', (req, res) => {
    const { id, old } = req.params;
    User
        .update({ StatusID: old }, { where: { id } })
        .then((results) => {
            console.log(results);
            req.flash('success_msg', `UnLock Success UserID : ${id}`);
            res.redirect('/admin/user')
        }).catch((err) => {
            console.log(err);
            req.flash('error_msg', `UnLock Fail UserID : ${id}`);
            res.redirect('/admin/user')
        })

})
module.exports = Router;



