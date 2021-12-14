var express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: '3306',
    password: "Monarch_2479",
    database: "pdcdb",
});

router.post('/customer/profile', function (req, res) {
    res.render('profile');
});
router.post('/customer/recommendations', function (req, res) {
    res.render('recommendations');
});
router.post('/customer/feedback', function (req, res) {
    res.render('feedback');
});



module.exports= router;