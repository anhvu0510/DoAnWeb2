const Express = require('express')
const Route = Express.Router();
const {authentication} = require('../Middleware/auth');
const { Router } = require('express');


Route.use(authentication)
Route.get('/', (req, res) => {
    res.render('PageFeatures')
})


module.exports = Route