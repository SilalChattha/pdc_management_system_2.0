const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "pdc2",
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const priv = req.body.priv;
  if (priv == 0)
    db.query(
      "SELECT email_address, password from Customer where user_email = ? and user_password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
