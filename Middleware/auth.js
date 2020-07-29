module.exports = {
    authentication: function (req, res, next) {
        
        if (req.isAuthenticated()) {
            if (req.user.StatusID === 2) {
                return next()
            } else {
                req.flash('error', 'Please Update Your Information')
                res.redirect('/update-information')
            }
        } 
        else {
            req.flash('error', 'Please Log In to use Our Features')
            res.redirect('/login')
       }
    },
    isStatusUpdate: function (req, res, next) {
        if (req.user) {
            if (req.user.StatusID === 1) {
                next()
            }
            else {
                req.flash('error', 'Access is denied')
                res.redirect('/features')
            }
        } else {
            req.flash('error', 'Please Log In to use Our Features')
            res.redirect('/login')
        }
        
    }
   
}