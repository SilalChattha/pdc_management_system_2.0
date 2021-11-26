const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const port = 3001;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "pdc2",
});
//extend server code for login post request by taking priv into account
app.post("/login", (req, res) => {
  const { email, password, priv } = req.body;
  if (priv === false) {
    db.query(
      "SELECT * FROM customer WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
        if (results.length === 0) {
          return res.status(401).json({
            message: "User not found",
          });
        }
        bcrypt.compare(password, results[0].password, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
            });
          }
          if (result) {
            return res.status(200).json({
              message: "Login Successful",
              user: results[0],
            });
          }
          return res.status(401).json({
            message: "Password Incorrect",
          });
        });
      }
    );
  } else {
    //login for staff
    db.query(
      "SELECT * FROM staff WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
        if (results.length === 0) {
          return res.status(401).json({
            message: "User not found",
          });
        }
        bcrypt.compare(password, results[0].password, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
            });
          }
          if (result) {
            return res.status(200).json({
              message: "Login Successful",
              user: results[0],
            });
          }
          return res.status(401).json({
            message: "Password Incorrect",
          });
        });
      }
    );
  }
});

//Server side data validation
app.post(
  "/register",

  (req, res) => {
    const errors = {};
    let isValid = false;
    const { email, password, priv, name } = req.body;
    if (password.length === 0 || email.length === 0 || name.length === 0) {
      res.json({ message: "Please fill all the fields" });
    } else {
      console.log(email, password, priv, name);
      const id = email.split("@")[0];
      // console.log(email, password, priv, name, id);
      bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log("hash=", hash);
        if (err) {
          console.log(err);
          errors["error"] = err;
        }

        // res.json({ message: { name: name, id: id } });
        if (priv && id.length > 10) {
          db.query(
            "INSERT INTO staff (staff_id,name,email,password,designation,salary) VALUES(?,?,?,?,?,?)",
            [id, name, email, hash, "manager", 100000],
            (err, result) => {
              console.log(err);
              if (err == null) {
                isValid = true;
              }
              errors["error"] = err;
            }
          );
        } else if (priv && id.length <= 10) {
          db.query(
            "INSERT INTO staff (staff_id,name,email,password,designation,salary) VALUES(?,?,?,?,?,?)",
            [id, name, email, hash, "cashier", 50000],
            (err, result) => {
              if (err == null) {
                isValid = true;
              }
              console.log(err);
              errors["error"] = err;
            }
          );
        } else if (!priv) {
          db.query(
            "INSERT INTO customer (customer_id,name,email,password,wallet_balance) VALUES(?,?,?,?,?)",
            [id, name, email, hash, 0],
            (err, result) => {
              if (err == null) {
                isValid = true;
              }
              console.log(err);
              errors["error"] = err;
            }
          );
        }
      });

      if (isValid) {
        res.json({ success: true });
      } else {
        res.json(errors);
      }
    }
  }
);

app.post(
  "/manager-update-stock", 
  (req,res) =>{
    const {name, quantity} = req.body;
    db.query("SELECT name FROM inventory WHERE name = ?", [name], (err,res)=>{
      if(err){
        db.query("INSERT INTO inventory (name,quantity) VALUES(??",[name,quantity])
      }
      else{
        db.query("UPDATE inventory SET quantity = ? WHERE name = ?",[quantity,name])
      }
    })
    res.json({ success: true });
  }
);

app.post(
  "/manager-update-menu"
)

app.listen(port, () => console.log(`PDC app listening on port ${port}!`));
