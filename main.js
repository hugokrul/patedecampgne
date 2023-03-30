const express = require("express");
let bodyParser = require("body-parser");

const app = express();
const path = require("path");
const port = 8005;

const staticPath = path.join(__dirname, "public");
const config = require("./config.js");

app.use(express.static(staticPath));
app.use(bodyParser.json());

//dotenv
const dotenv = require("dotenv").config();
const env = dotenv.parsed;

//Checking the crypto module for login
const crypto = require("crypto");
const key = env.CRYPTOKEY;

//database
const mysql = require("mysql");

console.log("Started server with config:");
console.log(config);

const db = mysql.createConnection({
  port: config.mysql.port,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//keeping database online
timeoutDatabase();
setInterval(() => {
  timeoutDatabase();
}, 120000);

function timeoutDatabase() {
  db.query("SELECT 1", (err, result) => {
    console.log(result);
  });
}

//Encrypting text
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// Decrypting text
function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      }

      if (result.length > 0) {
        let user = result[0];
        let decryptedPassword = decrypt({
          encryptedData: user.password,
          iv: user.password_iv,
        });
        if (password === decryptedPassword) {
          res.send(result);
        } else {
          res.send({
            message: "Wrong username/password combination",
          });
        }
      } else {
        res.send({
          message: "Email not found",
        });
      }
    }
  );
});

app.post("/register", (req, res) => {
  //userId: auto_increment
  const email = req.body.email;
  const password = encrypt(req.body.password);
  const fullName = req.body.fullName;
  const address = req.body.address;
  const creditCard = encrypt(req.body.creditCard);
  //order history in different table

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (result[0] === undefined) {
      db.query(
        "INSERT INTO users (email, password, password_iv, fullName, address, creditCard, creditCard_iv) VALUES (?,?,?,?,?,?,?)",
        [
          email,
          password.encryptedData,
          password.iv,
          fullName,
          address,
          creditCard.encryptedData,
          creditCard.iv,
        ],
        (error, result2) => {
          if (error) {
            console.log(error);
            res.send({
              message: err,
            });
          } else {
            res.send(result2);
          }
        }
      );
    } else {
      {
        res.send({
          message: "This email already exists",
        });
      }
    }
  });
});
app.post("/get-user", (req, res) => {
  const userId = req.body.userId;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        message: "No accounts found",
      });
    }
  });
});

app.post("/add-order-history", (req, res) => {
  //orderId is auto_incremented

  //order history based on UserId
  const userId = req.body.userId;
  const movieId = req.body.movieId;
  //movieId is a seperate table
  const dateTimeSlot = req.body.dateTimeSlot;

  db.query(
    "INSERT INTO orderHistory (userId, movieId, dateTimeSlot) VALUES (?,?,?)",
    [userId, movieId, dateTimeSlot],
    (error, result) => {
      if (error) {
        console.log(error);
        res.send({
          message: err,
        });
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/get-user-order-history", (req, res) => {
  const userId = req.body.userId;
  db.query(
    "SELECT * FROM orderHistory WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "No history found",
        });
      }
    }
  );
});
app.post("/get-order", (req, res) => {
  const orderId = req.body.orderId;
  db.query(
    "SELECT * FROM orderHistory WHERE orderId = ?",
    [orderId],
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "No order found",
        });
      }
    }
  );
});

app.post("/get-all-movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        message: "No movies found",
      });
    }
  });
});
app.post("/get-movie", (req, res) => {
  const movieId = req.body.movieId;
  db.query(
    "SELECT * FROM movies WHERE movieId = ?",
    [movieId],
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "No movie found",
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log("running");
});
