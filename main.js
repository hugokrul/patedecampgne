const express = require("express");
const morgan = require("morgan");
let bodyParser = require("body-parser");

const app = express();
const path = require("path");
const port = 8005;

const staticPath = path.join(__dirname, "public");

app.use(morgan("tiny"));
app.use(express.static(staticPath));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//dotenv
const dotenv = require("dotenv").config();
const env = dotenv.parsed;

//Checking the crypto module for login
const crypto = require("crypto");
const key = env.CRYPTOKEY;

//database
const fs = require("fs");
const { log } = require("console");
const sqlite3 = require("sqlite3").verbose();

let file = __dirname + "/" + "pateDeCampagne.db";
let exists = fs.existsSync(file);
if (!exists) {
  fs.openSync(file, "w");
}
let db = new sqlite3.Database(file);

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

app.post("/user-login/:credentials", async (req, res) => {
  //USE req.body FOR CUSTOM JS IN FRONTEND
  //USE req.body FOR FORMS IN FRONTEND

  let credentials = req.params.credentials;
  let credentialsArray = credentials.split(",");

  const email = credentialsArray[0];
  const password = credentialsArray[1];

  db.all("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    } else {
      if (result.length > 0) {
        let user = result[0];
        // let decryptedPassword = user.password;
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
  });
});

app.get("/koen", (req, res) => {
  db.all("SELECT * FROM users", (err, result) => {
    console.log(db);
    console.log(result);
    res.send("perfect");
  });
});

app.post("/user-register/:credentials", async (req, res) => {
  let credentials = req.params.credentials;
  let credentialsArray = credentials.split(",");

  const email = credentialsArray[0];
  //encript important data
  const password = encrypt(credentialsArray[1]);
  const fullName = credentialsArray[2];
  const address = credentialsArray[3];
  //encript important data
  const creditCard = encrypt(credentialsArray[4].toString());
  // //order history in different table

  db.all("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (result[0] === undefined) {
      db.all(
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
              message: error,
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
// app.post("/get-user", (req, res) => {
//   const userId = req.body.userId;
//   db.all("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
//     if (err) {
//       res.send({
//         error: err,
//       });
//     }

//     if (result.length > 0) {
//       res.send(result);
//     } else {
//       res.send({
//         message: "No accounts found",
//       });
//     }
//   });
// });

app.get("/get-user/:id", (req, res) => {
  const userId = req.params.id;
  db.all("SELECT * FROM users where userId = ?", [userId], (err, result) => {
    if (err) {
      res.send({ error: err });
    }

    if (result.length > 0) {
      let decryptedCreditCard = decrypt({
        encryptedData: result[0].creditCard,
        iv: result[0].creditCard_iv,
      });
      result[0].creditCard = decryptedCreditCard;
      res.send(result);
    } else {
      res.send({ message: "no accounts found" });
    }
  });
});
app.post(
  "/add-order-history/:userId&:movieId&:amount&:dateTimeSlot",
  (req, res) => {
    //orderId is auto_incremented
    //order history based on UserId
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const amount = req.params.amount;
    const dateTimeSlot = req.params.dateTimeSlot;
    //movieId is a seperate table
    db.all(
      "INSERT INTO orderHistory (userId, movieId, amount, dateTimeSlot) VALUES (?, ?,?,?)",
      [userId, movieId, amount, dateTimeSlot],
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
  }
);
app.post("/get-user-order-history/:userId", (req, res) => {
  const userId = req.params.userId;
  db.all(
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
  db.all(
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
  db.all("SELECT * FROM movies", (err, result) => {
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

app.get("/get-all-movies", (req, res) => {
  db.all("SELECT * FROM movies", (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "no movies" });
    }
  });
});
app.post("/get-actors", (req, res) => {
  const actorName = req.body.actorName;
  db.all("SELECT * FROM actor WHERE name = ?", [actorName], (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        message: "No actor found",
      });
    }
  });
});

app.get("/get-movie/:id", function (req, res) {
  const movieId = req.params.id;
  db.all("SELECT * FROM movies WHERE movieId = ?", [movieId], (err, result) => {
    if (err) {
      res.send({ error: err });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        message: "No movie found",
      });
    }
  });
});

app.get("/all-actors-of-movie/:id", function (req, res) {
  const movieId = req.params.id;
  db.all(
    "SELECT actor.name FROM actor, actorInMovie WHERE actor.actorId = actorInMovie.actorId AND actorInMovie.movieId = ?",
    [movieId],
    (err, result) => {
      if (err) {
        res.send({ error: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "no actors in movie" });
      }
    }
  );
});

app.get(/^\/movies\/(\d+)$/, function (req, res) {
  res.sendFile(path.join(__dirname + "/public/html/selectedMovie.html"));
  console.log(parseInt(req.params[0], 10));
});

app.get("/cart", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/html/cart.html"));
});
app.get(/^\/movies\/(\d+)$/, function (req, res) {
  res.sendFile(path.join(__dirname + "/public/html/selectedMovie.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/html/login.html"));
});
app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/html/register.html"));
});
app.get("/profile", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/html/profile.html"));
});

app.listen(port, () => {
  console.log("running");
});
