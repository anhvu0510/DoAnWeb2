const Express = require("express");
const BodyParser = require("body-parser");
const Passport = require('./Middleware/passport')
const Session = require("express-session");
const flash = require("connect-flash");
const db = require("./Services/db");

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.static("Public"));
app.use(BodyParser.urlencoded({ extended: false }));

//View Engine
app.set("views", "./Views");
app.set("view engine", "ejs");

app.use(
  Session({
    secret: "secured_key",
    cookie: {
      name: "session",
      keys: ["123"],
      maxAge: 24 * 60 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true
  })
);


app.use(BodyParser.json());
app.use(Passport.initialize());
app.use(Passport.session());

/*************END******************/




// Session

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

app.use((req, res) => {
    res.status(404).render('404');
})

app.use((err, req, res, next) => {
    console.log(err + '');
    res.status(500).render('500')

})
db.sync()
  .then(function () {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  })
  .catch(function (err) {
    console.error(err + ' ');
  });
