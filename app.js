const Express = require('express');
const BodyParser = require('body-parser')

const app = Express();
const port = process.env.PORT || 3000;

//Cookie-Session

/*************END******************/

app.use(Express.static('Public'));
app.use(BodyParser.urlencoded({ extended: false }))

//View Engine
app.set('views', './views');
app.set('view engine', 'ejs');
//Middleware
/*************END******************/

//Route
/*************END******************/

app.get('/',(req, res)=> {
    res.render('index');
})

app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
})