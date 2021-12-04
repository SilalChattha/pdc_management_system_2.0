var express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
const salt = bcrypt.genSalt(10);

const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "mydb",
});

router.post("/signup", (req, res) => {
    const {name, age, email, password, code} = req.body;
    bcrypt.hash(password, salt, function(err, hash) {
        // Store in database here
        if(err){
            console.log(1)
            res.render("error")
        }
        else{
            if(code == "13"){
                db.query("INSERT INTO staff (name,email,password,designation) VALUES(?,?,?,?,?)",
                [name, email, hash, 0],(error, results, fields) => {
                    if(error){
                        res.render("error")
                    }
                    else{
                        res.render("login")
                    }
                })
            }
            if(code == "69"){
                db.query("INSERT INTO staff (name,email,password,designation) VALUES(?,?,?,?,?)",
                [name, email, hash, 1],(error, results, fields) => {
                    if(error){
                        res.render("error")
                    }
                    else{
                        res.render("login")
                    }
                })
            }
            else{
                db.query("INSERT INTO customer (name,email,password,wallet_balance) VALUES(?,?,?,?,?)",
                [name, email, hash, 0],(error, results, fields) => {
                    if(error){
                        console.log(2)
                        res.render("error")
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