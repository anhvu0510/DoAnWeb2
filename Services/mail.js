const Email = require('nodemailer');
const Hbs = require('nodemailer-express-handlebars')
const Path = require('path')

const EMAIL_FROM = process.env.EMAIL_FROM || 'netbanking.ltweb02@gmail.com'
const PASSWORD_FROM = process.env.PASSWORD_FROM || '@123456789@'
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/'



const transporter = Email.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_FROM,
        pass : PASSWORD_FROM
    }
})

transporter.use('compile', Hbs({
    viewEngine: {
        defaultLayout: false,
    },
    extName: '.ejs',
    viewPath: './Views/'
}))

module.exports = {
    SendMailActive: (to, subject, obj) => {
        transporter.sendMail({
            from: `NET BANKING ${EMAIL_FROM}`,
            to,
            subject,
            template: 'PageSendMail',
            context:{
                // link : `${BASE_URL}${custom_content}`,
                action : `${BASE_URL}\active`,
                obj
            } 
        }, (err, res) => {
                if (err) {
                    console.log('ERROR : Send Fail');
                    console.log(err);
                } else {
                    console.log('MESSAGE : Send Success');
                }
       })
            
    }
}