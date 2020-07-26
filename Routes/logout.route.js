const Express = require("express");
const Router = Express.Router();

Router.get('/',(req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = Router;