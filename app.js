const Express = require("express");
const BodyParser = require("body-parser");
const Passport = require('passport')
const Session = require("express-session");
const flash = require("connect-flash");
const db = require("./Services/db");
const path = require('path');


const app = Express();
//Port
const port = process.env.PORT || 3000;
//View Engine
// app.set("views", "./Views");
// app.set("view engine", "ejs");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));


//app.use(Express.static('Public'));
//app.use(Express.static(__dirname + '/public'));
app.use(Express.static(path.join(__dirname, 'Public')))
app.use(
  Session({
    secret: "secured_key",
    cookie: {
      name: "session",
      keys: ["123"],
      maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(Passport.initialize());
app.use(Passport.session());

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

/*************END******************/
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
});




//Middleware


/*************END******************/

//Route
/*************END******************/


// app.use("/about", require("./Routes/about.route"));
// app.use("/blog", require("./Routes/blog.route"));
// app.use("/contact", require("./Routes/contact.route"));
// app.use("/investors", require("./Routes/investors.route"));
// app.use("/single-blog", require("./Routes/single-blog.route"));

app.use('/', require('./Routes/home.route'))
app.use("/login", require("./Routes/login.route"));
app.use("/register", require("./Routes/register.route"));
app.use("/logout", require("./Routes/logout.route"));
app.use("/features", require("./Routes/features.route"));
app.use('/update-information', require('./Routes/update_info.route'))


app.use((req, res) => {
    res.status(404).render('404',{title : 'Page Not Found'});
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).render('500',{title : 'Page 500'})

})
db.sync()
  .then(function () {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  })
  .catch(function (err) {
    console.error(err + ' ');
  });
