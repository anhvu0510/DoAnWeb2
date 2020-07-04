const Express = require('express')
const Route = Express.Router();

Route.get('/', (req, res) => {
    res.render('single-blog')
})


module.exports = Route