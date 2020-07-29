const Express = require('express')
const User = require('../Services/user')
const Route = Express.Router();

Route.get('/', (req, res) => {
    res.render('PageHome', { title : 'Home Page'})
})

Route.post('/active', (req, res) => {
    const { id } = req.body;
    User.findByPk(id)
            .then((user) => {
                
                if (user && user.StatusID === 1) {
                    req.flash('error_msg', 'Your Account Is Actived')
                    res.redirect('/login');
                }
                else {
                    User.update({ StatusID: 1 }, { where: { id } })
                    .then((result) => {
                        console.log('Update Success');
                        req.flash('success_msg', 'Acctive Email Success, Now You Can Log In')
                        res.redirect('/login');
                    })
                        .catch((err) => {
                        console.log("Update Fail");
                        console.log(err);
                    });
                }
            })
            .catch(err => {
                console.log("Can not found");
                console.log(err);
            })
       
    })

module.exports = Route