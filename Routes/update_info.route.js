const Express = require('express')
const Router = Express.Router();
const RNG_ID = require('uuid')
const {isStatusUpdate} = require('../Middleware/auth')
const {Upload} = require('../Services/upload')
const Customer = require('../Services/customer');
const User = require('../Services/user')


Router.use(isStatusUpdate);

Router
    .get('/', (req, res) => {
        res.render('PageInfo', { title: 'Update Information' })  
    })
    .post('/',(req, res) => {
        Upload(req, res, async(err) => {
            if (err) {
                req.flash('error_msg', 'Upload Image Fail, Please try again')
                res.redirect('/update-information');
            }else {
                const { imgFontFile, imgEndFile } = req.files;
                const { Fullname, DOB, Gender, Phone, Address, Identify, IdentifyNumber, IdentifyDate } = req.body;
                const newCustomer = await Customer.create({
                    id: RNG_ID.v4(),
                    name: Fullname,
                    dob: DOB,
                    phone: Phone,
                    address: Address,
                    gender : Gender,
                    identify: Identify,
                    identifyID: IdentifyNumber,
                    identifyDate: IdentifyDate,
                    identifyFontImg: imgFontFile[0].filename,
                    identifyEndImg: imgEndFile[0].filename,
                    userId: req.user.id,
                })
                newCustomer
                    .save()
                    .then( async (cus) => {
                        const isSuccess = await User.update({StatusID : 2}, {where : {id : req.user.id}})
                        if (isSuccess[0] === 1) {
                            req.flash('success_msg', 'Update Infomaton Success')
                            res.redirect('/waiting-page');
                        } else {
                            console.log('Cap nhat trang thai that bai');
                            req.flash('error_msg', 'Something Wrong, Try Again')
                            res.redirect('/update-information');
                        }
                        
                       
                    })
                    .catch((err) => {
                        console.log("Error : Cannot add new customer");
                        console.log(err);
                    })
            }
        })

    })


module.exports = Router;