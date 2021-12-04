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

router.post("/login", (req, res) => {
    const { email, password, priv } = req.body;
    const hashed = bcrypt.hash(password, salt);
    if (priv === false) {
                
        db.query( "SELECT * FROM customer WHERE email = ?",[email],(error, results, fields) => {
            if (error) {res.render("error")}
            // console.log(results)
            const validPassword = bcrypt.compare(hashed, results[0].password);
            if (validPassword) {
                res.render("cust_page")
            }
            else{
                res.render("error")
            }
            
        })}
      
    else {
      //login for staff
      db.query( "SELECT * FROM staff WHERE email = ? AND designation =0",[email],(error, results, fields) => {
        if (error) {
            db.query( "SELECT * FROM staff WHERE email = ? AND designation =1",[email],(error, results, fields) => {
                if (error) {res.render("error")}
                const validPassword = bcrypt.compare(hashed, results[0].password);
                if(validPassword){
                    res.render("manager_page")
                }
                else{
                    res.render("error")
                }
                
            })
        }
        else{
            const validPassword = bcrypt.compare(hashed, results[0].password);
            if (validPassword) {
                res.render("staff_page",)
            }
            else{
                res.render("error")
            }
        }   
        })}

});


module.exports= router;