var express = require('express');
const { engine } = require('express-handlebars');
const path = require('path')
const router = express.Router()

var login = require("./routes/login")
var signup = require("./routes/signup")

var bodyParser = require('body-parser');


var login = require('./routes/login')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});


//testing. delete later
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/customer', function (req, res) {
    res.render('cust_page');
});
app.get('/manager', function (req, res) {
    res.render('manager_page');
});
app.get('/staff', function (req, res) {
    res.render('staff_page');
});
app.get('/register', function (req, res) {
    res.render('register');
});

//testing

app.post('/customer/profile', function (req, res) {
    res.render('profile');
});
app.post('/customer/recommendations', function (req, res) {
    res.render('recommendations');
});
app.post('/customer/feedback', function (req, res) {
    res.render('feedback');
});
app.post('/menu', function (req, res) {
    res.render('menu');
});
app.post('/logout', function (req, res) {
    res.render('login');
});
app.use(signup);
app.use(login);

app.listen(3000);
