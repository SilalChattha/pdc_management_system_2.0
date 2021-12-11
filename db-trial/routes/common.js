var express = require('express');
const router = express.Router()

const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: '3306',
    password: "Monarch_2479",
    database: "pdcdb",
});

// const db = mysql.createConnection({
//     host: "mysql-61282-0.cloudclusters.net",
//     user: "admin",
//     port: '15353',
//     password: "MS2stxGx",
//     database: "pdc",
// });


router.post('/menu', function (req, res){
    db.query("SELECT * FROM menu",(err,result)=>{
        console.log(result)
        var temp ={list: result}
        res.render('menu',temp);
    })
    // res.render("error");
    
});


module.exports= router;