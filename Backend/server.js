const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ReactDB"
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
      // console.log(err);
    } else {
      return res.json(data);
      // res.send("Values Inserted");
    }
  });
});
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
      // console.log(err);
    }
    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("Error");
    }
  });
});
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })
