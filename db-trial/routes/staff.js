var express = require('express');
const router = express.Router();

const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: '3306',
    password: "Monarch_2479",
    database: "pdcdb",
});

router.get("/staff/wallet", (req,res)=>{
    res.render('wallet')
})

router.post("/staff/wallet", (req,res)=>{
    const {ID, amount} = req.body;
    db.query(`SELECT wallet FROM customers WHERE ID = ?`, [ID], (err,results)=>{
        var total = parseInt(amount) + parseInt(results[0].wallet);
        db.query(`UPDATE customers SET wallet = ? WHERE ID = ?`, [total,ID],);
        res.redirect("../staff");
    })
    
})



module.exports= router;