const Customer = require('../Services/customer')

module.exports = {
    authentication: async function (req, res, next) {
        
        if (req.isAuthenticated()) {
            const status = req.user.StatusID
            if ( status === 3) {
                const Found = await Customer.findOne({ where: { userId: req.user.id }, attributes : ['name'] })
                res.locals.CustomerName = Found !== null ? Found.name : 'Customer'
                return next()
            } else if(status === 2){
                req.flash('error', 'Please Wait for the Staff to Validate Your Information')
                res.redirect('/waiting-page')
            } else  if(status === 1){
                req.flash('error', 'Please Update Your Information')
                res.redirect('/update-information')
            } else {
                res.redirect('/404')
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
        
    },
    isStatusWaiting: async function (req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.StatusID === 2) {
                const Found = await Customer.findOne({ where: { userId: req.user.id }, attributes: ['name'] })
                res.locals.CustomerName = Found !== null ? Found.name : 'Customer'
                return next()
            }else {
                req.flash('error', 'Access is denied')
                res.redirect('/features')
            }
        } else {
            req.flash('error', 'Please Log In to use Our Features')
            res.redirect('/login')
        }
        
    }
   
}