module.exports = {
    authentication: function(req, res, next){
        if (req.isAuthenticated()) {
            return next()
        }   
        req.flash('error','Please Log In to use Our Features')
        res.redirect('/login')
    }
}