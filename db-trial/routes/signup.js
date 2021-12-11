var express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");

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
db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

// db.query("create table customers(ID INT NOT NULL AUTO_INCREMENT, customer_name VARCHAR(100) NOT NULL, email VARCHAR(40) NOT NULL, pass VARCHAR(40) NOT NULL, wallet INT zerofill, PRIMARY KEY ( ID ));create table staff(ID INT NOT NULL AUTO_INCREMENT,customer_name VARCHAR(100) NOT NULL,email VARCHAR(40) NOT NULL,pass VARCHAR(40) NOT NULL,designation INT NOT NULL,PRIMARY KEY ( ID ));")

router.post("/register",(req,res)=>{
    res.render("register")
})

router.post("/signup", (req, res) => {
    const {qwq, name, email, password, code} = req.body;
    console.log(name,email,password,code);
    bcrypt.hash(password, 10, function(err, hash) {
        // Store in database here
        if(err){
            console.log(err)
            console.log(1)
            res.render("error",{mess: "Database Error"})
        }
        else{
            if(code == "13" ){
                db.query("INSERT INTO staff (staff_name,email,pass,designation) VALUES(?,?,?,?)",
                [name, email, hash, 0],(error, results, fields) => {
                    if(error){
                        res.render("error",{mess: "Database Error"})
                    }
                    else{
                        res.render("login")
                    }
                })
            }
            else if(code == "69"){
                db.query("INSERT INTO staff (staff_name,email,pass,designation) VALUES(?,?,?,?)",
                [name, email, hash, 1],(error, results, fields) => {
                    if(error){
                        res.render("error",{mess: "Database Error"})
                    }
                    else{
                        res.render("login")
                    }
                })
            }
            else if(code=="0"){
                db.query("INSERT INTO customers (customer_name,email,pass,wallet) VALUES(?,?,?,?)",
                [name, email, hash, 0],(error, results, fields) => {
                    
                    if(error){
                        console.log(2)
                        console.log(error)
                        res.render("error",{mess: "Database Error"})
                    }
                    else{
                        res.render("login")
                    }
                })
            }
        }
      });
});

module.exports= router;