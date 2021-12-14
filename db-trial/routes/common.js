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

// const db = mysql.createConnection({
//     host: "mysql-61282-0.cloudclusters.net",
//     user: "admin",
//     port: '15353',
//     password: "MS2stxGx",
//     database: "pdc",
// });

router.post('/delcart',function(req,res){
    var customer_id = req.body['shop'];
    console.log(customer_id)
    db.query("SELECT order_id from cart  WHERE customer_id = ?", [customer_id], (err,resu)=>{
        console.log('order')
        console.log(resu[0].order_id)
        db.query("DELETE FROM cart WHERE order_id = ? " [resu[0].order_id])
    })
    
    
    var list=[];
    db.query("SELECT food_id from cart WHERE customer_id = ?", [customer_id], (err,resu)=>{
        if (err){res.render("error")}
        if((resu.length >=1)){
            for (let i = 0; i < resu.length; i++){
            db.query("SELECT food_name, price FROM menu WHERE ID = ?",resu[i].food_id,(err,result)=>{
                if (err){res.render("error")}
                list.push(result[0])
            })}
        }
    })
    var sleep = require('system-sleep');
    sleep(10); // sleep   
    var total = 0
    if((list.length >1)){ total = list.reduce(function (a, b) { return a + b.price; }, 0);}
    
    res.render("cart",{items: list, total: total, cust_ID: customer_id})

})

router.post('/cart', function(req,res){
    var customer_id = req.body['shop'];
    var list=[];
    db.query("SELECT food_id from cart WHERE customer_id = ?", [customer_id], (err,resu)=>{
        if (err){res.render("error")}
        if((resu.length >=1)){
            for (let i = 0; i < resu.length; i++){
            db.query("SELECT food_name, price FROM menu WHERE ID = ?",resu[i].food_id,(err,result)=>{
                if (err){res.render("error")}
                list.push(result[0])
            })}
        }
    })
    var sleep = require('system-sleep');
    sleep(10); // sleep   
    var total = 0
    if((list.length >1)){ total = list.reduce(function (a, b) { return a + b.price; }, 0);}
    
    res.render("cart",{items: list, total: total, cust_ID: customer_id})
    
    
    
})


router.post('/addcart', function(req,res){
    console.log(req.body)
    const customer_id = req.body["field"];
    const food_id = req.body["butt1"];
    db.query("INSERT INTO cart (customer_id,food_id) VALUES (?,?)",
    [customer_id, food_id],(error, results, fields) => {
        if(error){
            res.render("error",{mess: "Cart Error"})
        }
        else{
            // res.redirect("menu", {butt1: customer_id})

            db.query("SELECT * FROM menu",(err,result)=>{
                var temp ={list: result, cust_ID: customer_id}
                res.render('menu',temp);
            })
        }
    })
})

router.post('/menu', function (req, res){
    
    var id = req.body["butt1"];
    console.log(id)
    db.query("SELECT * FROM menu",(err,result)=>{
        var temp ={list: result, cust_ID: id}
        res.render('menu',temp);
    })
    // res.render("error");
    
});
router.get('/menu', function (req, res) {
    db.query("SELECT * FROM menu",(err,result)=>{
        console.log(result)
        var temp ={list: result}
        res.render('menu',temp);
    })
});

router.post('/cart', function(req,res){
    const {id, name, price} = req.body;
    console.log(req.body)
})


module.exports= router;