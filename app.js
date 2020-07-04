const Express = require("express");
const BodyParser = require("body-parser");
const Passport = require("passport");
const Session = require("express-session");
const Flash = require("connect-flash");

const db = require("./Services/db");

const app = Express();
const port = process.env.PORT || 3000;

// Session
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
/*************END******************/

app.use(Flash());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(Express.static("Public"));

//View Engine
app.set("views", "./Views");
app.set("view engine", "ejs");
//Middleware
/*************END******************/

//Route
/*************END******************/
app.use('/',require('./Routes/index.route'))
app.use("/login", require("./Routes/login.route"));
app.use("/register", require("./Routes/register.route"));
app.use("/about", require("./Routes/about.route"));
app.use("/blog", require("./Routes/blog.route"));
app.use("/contact", require("./Routes/contact.route"));
app.use("/investors", require("./Routes/investors.route"));
app.use("/single-blog", require("./Routes/single-blog.route"));
app.use("/our-features", require("./Routes/our-features.route"));
db.sync()
  .then(function() {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  })
  .catch(function(err) {
    console.error(err);
  });
