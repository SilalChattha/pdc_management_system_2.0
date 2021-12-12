var express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt");
// const salt = bcrypt.genSalt(10);


const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: '3306',
    password: "Monarch_2479",
    database: "pdcdb",
});

// import { create } from 'express-handlebars';
// const hbs = create({
//     // Specify helpers which are only registered on this instance.
//     helpers: {
//         set_storage(ID) { sessionStorage.setItem("cust_id",ID); },
//     }
// });
// const db = mysql.createConnection({
//     host: "mysql-61282-0.cloudclusters.net",
//     user: "admin",
//     port: '15353',
//     password: "MS2stxGx",
//     database: "pdc",
// });

router.post("/login", (req, res) => {
    const { email, password, priv } = req.body;
    // const hashed = bcrypt.hash(password, salt);
    
    if (priv!=1) {
            
        db.query( "SELECT * FROM customers WHERE email = ?",[''+email],(error, results, fields) => {
            if (error) {res.render("error",{mess: "Database Error"})}
            if (results.length >=1){
               
                var validPassword = bcrypt.compareSync(password, results[0].pass);
                if (validPassword == true) {
                    res.render("cust_page", {
                        ID: results[0].ID
                        })
                }
                else{
                    res.render("error",{mess: "Incorrect password"})
                }
            }
            else{res.render("error",{mess: "Incorrect email"})}
        })} 
      
    else {
      //login for staff
      db.query( "SELECT * FROM staff WHERE email = ? AND designation = ?",[email,0],(error, results, fields) => {
        if (error) {
            console.log("error");
        }
        else if(results.length==0){
            db.query( "SELECT * FROM staff WHERE email = ? AND designation = ?",[email,1],(err, results, fields) => {
                if (err) {res.render("error",{mess: "Database Error"})}
                if (results.length >=1){
                    const validPassword = bcrypt.compare(password, results[0].pass);
                    if(validPassword){
                        res.render("manager_page")
                    }
                    else{
                        res.render("error",{mess: "Incorrect password"})
                    }
                }
                 else{res.render("error",{mess: "Incorrect email"})}
            })
        }
        else{
            if (results.length >=1){
                const validPassword = bcrypt.compare(password, results[0].pass);
                if (validPassword) {
                    res.render("staff_page")
                }
                else{
                    res.render("error",{mess: "Incorrect password"})
                }
            }
            else{res.render("error",{mess: "Incorrect email"})}
        }   
        })}

});


module.exports= router;