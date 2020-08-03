const Express = require('express')
const User = require('../Services/user')
const Route = Express.Router();
const { isStatusWaiting } = require('../Middleware/auth')
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
                    User.update({ StatusID: 1,old_status : 1 }, { where: { id } })
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

Route.get('/waiting-page', isStatusWaiting ,(req, res) => {
    res.render('PageWaiting', { title: 'Waiting' })
})


module.exports = Route